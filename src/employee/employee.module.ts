import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Employee]),
    forwardRef(() => AuthModule), // <-- Use forwardRef here
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
