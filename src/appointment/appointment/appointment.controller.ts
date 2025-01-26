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

  @Post()
  async bookAppointment(@Body() bookingData: {
    userId: number;
    sabhaId: number;
    serviceId: number;
    serviceTitle: string;
    departmentId: number;
    date: string;
    timeSlot: string;
    notes?: string;
  }) {
    return this.appointmentService.bookAppointment(bookingData);
  }



  // Get all appointments with status = 0, from the day after tomorrow onwards, ordered by creation date DESC
  @Get()
  async getBookedAppointments(
    @Query('sabhaId') sabhaId: number,
    @Query('departmentId') departmentId: number,
  ) {
    return this.appointmentService.getBookedAppointments(sabhaId, departmentId);
  }

  // Get appointment details by ID, including the user's full name
  @Get('/:id')
  async getBookedAppointmentDetails(@Param('id') appointmentId: number) {
    return this.appointmentService.getBookedAppointmentDetails(appointmentId);
  }
}
