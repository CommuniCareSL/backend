import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../user/user.model';
import { Sabha } from '../../sabha/sabha.model';
import { Appointment } from './appointment.model';
import { Department } from '../../department/department.model';


@Module({
  imports: [SequelizeModule.forFeature([ Sabha, User, Appointment, Department] )],
  controllers: [AppointmentController],
  providers: [AppointmentService]
})
export class AppointmentModule {}
