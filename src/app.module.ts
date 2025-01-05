import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.module';
import { EmployeeController } from './employee/employee.controller';
import { EmployeeModule } from './employee/employee.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { SabhaController } from './sabha/sabha.controller';
import { SabhaModule } from './sabha/sabha.module';
import { DepartmentController } from './department/department.controller';
import { DepartmentModule } from './department/department.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    EmployeeModule,
    UserModule,
    SabhaModule,
    DepartmentModule,
    AuthModule,
  ],
  controllers: [AppController, EmployeeController, UserController, SabhaController, DepartmentController],
  providers: [AppService],
})
export class AppModule {}
