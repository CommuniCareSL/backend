import { Module } from '@nestjs/common';
import { User } from './user.model';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';



@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService]
})
export class UserModule {}
