import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminChartController } from './admin-chart/admin-chart.controller';
import { SuperAdminChartController } from './super-admin-chart/super-admin-chart.controller';
import { AdminChartService } from './admin-chart/admin-chart.service';
import { SuperAdminChartService } from './super-admin-chart/super-admin-chart.service';
import { Sabha } from 'src/sabha/sabha.model';
import { User } from 'src/user/user.model';
import { Complaint } from 'src/complaint/complaint/complaint.model';

@Module({
  imports: [SequelizeModule.forFeature([ Sabha, User, Complaint])],
  controllers: [AdminChartController, SuperAdminChartController],
  providers: [AdminChartService, SuperAdminChartService],
})
export class ChartModule {}
