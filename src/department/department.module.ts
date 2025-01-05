import { Module } from '@nestjs/common';
import { Department } from './department.model';
import { DepartmentService } from './department.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Department])],
  providers: [DepartmentService]
})
export class DepartmentModule {}
