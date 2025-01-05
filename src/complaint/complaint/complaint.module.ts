import { Module } from '@nestjs/common';
import { Sabha } from '../../sabha/sabha.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ComplaintService } from './complaint.service';
import { Complaint } from './complaint.model';
import { Employee } from '../../employee/employee.model';
import { ComplaintController } from './complaint.controller';
import { ComplaintCategory } from '../complaint-category/complaint-category.model';
import { User } from '../../user/user.model';

@Module({
  imports: [SequelizeModule.forFeature([ Sabha, Employee, Complaint, ComplaintCategory, User ])],
  controllers: [ComplaintController],
  providers: [ComplaintService]
})
export class ComplaintModule {}
