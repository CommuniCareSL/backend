import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';  // Adjust based on actual file path
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async signUp(userData): Promise<User> {
    const { email, password, fullName, idNumber, phoneNumber, district, sabhaId } = userData;

    // Check if the email already exists
    const existingUser = await this.userModel.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await this.userModel.create({
      fullName,
      idNumber,
      phoneNumber,
      district,
      sabhaId,
      email,
      password: hashedPassword,
      isBlock: 0,
      isDelete: 0,
    });

    return newUser;
  }

  async login(email: string, password: string) {
    // Find user by email
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Compare the hashed password with the stored one
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = this.jwtService.sign({
      userId: user.userId,
      email: user.email,
      fullName: user.fullName,
      sabhaId: user.sabhaId,
    });

    // Return token and user data
    return {
      token,
      userId: user.userId,
      fullName: user.fullName,
      sabhaId: user.sabhaId,
    };
  }
}
