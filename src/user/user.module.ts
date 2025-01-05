import { Module } from '@nestjs/common';
import { User } from './user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';


import { JwtModule } from '@nestjs/jwt';


// @Module({
//   imports: [SequelizeModule.forFeature([User])],
//   controllers: [UserController],
//   providers: [UserService]
// })
// export class UserModule {}
@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret: 'your-secret-key', // Change this to a proper secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
