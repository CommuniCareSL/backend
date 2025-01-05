import { Module } from '@nestjs/common';
import { Sabha } from './sabha.model';
import { SabhaService } from './sabha.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employees } from '../employees/employees.model';


@Module({
  imports: [SequelizeModule.forFeature([ Sabha, Employees])],
  providers: [SabhaService]
})
export class SabhaModule {}
