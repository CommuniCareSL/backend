import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.module';
import { EmployeesController } from './employees/employees.controller';
import { EmployeesModule } from './employees/employees.module';
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
    EmployeesModule,
    UserModule,
    SabhaModule,
    DepartmentModule,
    AuthModule,
  ],
  controllers: [AppController, EmployeesController, UserController, SabhaController, DepartmentController],
  providers: [AppService],
})
export class AppModule {}
