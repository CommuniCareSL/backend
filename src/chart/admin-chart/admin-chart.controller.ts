import { Controller, Get, Param } from '@nestjs/common';
import { AdminChartService } from './admin-chart.service';

@Controller('admin-chart')
export class AdminChartController {
    constructor(private readonly adminChartService: AdminChartService) {}

    //check - http://localhost:3000/admin-chart/complaint-counts/2
    @Get('complaint-counts/:sabhaId')
    async getComplaintCounts(@Param('sabhaId') sabhaId: number) {
        return this.adminChartService.getComplaintCountsByStatus(sabhaId);
    }

    @Get('monthly/:sabhaId')
    async getComplaintData(@Param('sabhaId') sabhaId: number) {
        return this.adminChartService.getComplaintDataBySabhaId(sabhaId);
    }
}