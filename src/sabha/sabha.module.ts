import { Module } from '@nestjs/common';
import { Sabha } from './sabha.model';
import { SabhaService } from './sabha.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from '../employee/employee.model';


@Module({
  imports: [SequelizeModule.forFeature([ Sabha, Employee])],
  providers: [SabhaService]
})
export class SabhaModule {}
