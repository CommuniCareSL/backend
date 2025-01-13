import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
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
      isBlock: false,
      isDelete: false,
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








  // Web app
  async findUsersBySabhaAndBlockStatus(sabhaId: number, isBlock: boolean): Promise<{ userId: number, fullName: string, phoneNumber: string }[]> {
    const users = await this.userModel.findAll({
      where: {
        sabhaId,
        isBlock,
      },
      attributes: ['userId', 'fullName', 'phoneNumber'], // Select only the required fields
    });

    return users.map(user => ({
      userId: user.userId,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
    }));
  }

  async findUserById(userId: number): Promise<{ userId: number; fullName: string; idNumber: string; email: string; phoneNumber: string; district: string }> {
    const user = await this.userModel.findOne({
      where: { userId }, // Find user by userId
      attributes: ['userId', 'fullName', 'idNumber', 'email', 'phoneNumber', 'district'], // Select specific fields
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`); // Throw an error if user is not found
    }

    return {
      userId: user.userId,
      fullName: user.fullName,
      idNumber: user.idNumber,
      email: user.email,
      phoneNumber: user.phoneNumber,
      district: user.district,
    };
  }

  async updateBlockStatus(userId: number, isBlock: boolean): Promise<User> {
    const user = await this.userModel.findOne({ where: { userId } }); // Find user by userId

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`); // Throw an error if user is not found
    }

    user.isBlock = isBlock; // Update isBlock status
    await user.save(); // Save the updated user

    return user; // Return the updated user
  }
}
