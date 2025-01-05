import { Module } from '@nestjs/common';
import { Sabha } from '../../sabha/sabha.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ComplaintService } from './complaint.service';
import { Complaint } from './complaint.model';
import { Employee } from '../../employee/employee.model';

@Module({
  imports: [SequelizeModule.forFeature([ Sabha, Employee, Complaint])],
  providers: [ComplaintService]
})
export class ComplaintModule {}
