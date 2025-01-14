import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { AppointmentService } from './appointment.service';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('availability')
  async checkAvailability(
    @Query('sabhaId') sabhaId: number,
    @Query('departmentId') departmentId: number,
    @Query('date') date: string,
  ) {
    return this.appointmentService.checkTimeSlotAvailability(
      sabhaId,
      departmentId,
      date,
    );
  }
}
