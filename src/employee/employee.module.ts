import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { AuthModule } from '../auth/auth.module';
import { Sabha } from '../sabha/sabha.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Employee, Sabha]),
    forwardRef(() => AuthModule), // <-- Use forwardRef here
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
