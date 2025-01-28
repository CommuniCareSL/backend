import { Controller, Get, Put, Post, Body, Param, Query } from '@nestjs/common';
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
  @Get('booked')
  async getBookedAppointments(
    @Query('sabhaId') sabhaId: number,
    @Query('departmentId') departmentId: number,
  ) {
    return this.appointmentService.getBookedAppointments(sabhaId, departmentId);
  }

  // Get appointment details by ID, including the user's full name
  @Get('booked/:id')
  async getBookedAppointmentDetails(@Param('id') appointmentId: number) {
    return this.appointmentService.getBookedAppointmentDetails(appointmentId);
  }

  @Put('booked/:id/cancel')
  async cancelBookedAppointment(
    @Param('id') appointmentId: number,
    @Body('cancelReason') cancelReason: string,
  ) {
    return this.appointmentService.cancelBookedAppointment(appointmentId, cancelReason);
  }

  @Get('today')
  async getTodayAppointments(
    @Query('sabhaId') sabhaId: number,
    @Query('departmentId') departmentId: number,
  ) {
    return this.appointmentService.getTodayAppointments(sabhaId, departmentId);
  }

  // Get appointment details by ID, including the user's full name
  @Get('today/:id')
  async getTodayAppointmentDetails(@Param('id') appointmentId: number) {
    return this.appointmentService.getTodayAppointmentDetails(appointmentId);
  }

  @Put('today/:id/cancel')
  async cancelTodayAppointment(
    @Param('id') appointmentId: number,
    @Body('cancelReason') cancelReason: string,
  ) {
    return this.appointmentService.cancelTodayAppointment(appointmentId, cancelReason);
  }

  @Put('today/:id/start')
  async startTodayAppointment(@Param('id') appointmentId: number) {
    return this.appointmentService.startTodayAppointment(appointmentId);
  }

  // Get all ongoing appointments (status = 2)
  @Get('ongoing')
  async getOngoingAppointments(
    @Query('sabhaId') sabhaId: number,
    @Query('departmentId') departmentId: number,
  ) {
    return this.appointmentService.getOngoingAppointments(sabhaId, departmentId);
  }

  // Get details of a specific ongoing appointment
  @Get('ongoing/:id')
  async getOngoingAppointmentDetails(@Param('id') appointmentId: number) {
    return this.appointmentService.getOngoingAppointmentDetails(appointmentId);
  }

  // Mark an ongoing appointment as completed (status = 3)
  @Put('ongoing/:id/complete')
  async completeOngoingAppointment(@Param('id') appointmentId: number) {
    return this.appointmentService.completeOngoingAppointment(appointmentId);
  }

  @Put('ongoing/:id/cancel')
  async cancelOngoingAppointment(
    @Param('id') appointmentId: number,
    @Body('cancelReason') cancelReason: string,
  ) {
    return this.appointmentService.cancelOngoingAppointment(appointmentId, cancelReason);
  }

  // Get all canceled (status = 3) and completed (status = 1) appointments
  @Get('canceled-or-completed')
  async getCanceledOrCompletedAppointments(
    @Query('sabhaId') sabhaId: number,
    @Query('departmentId') departmentId: number,
  ) {
    return this.appointmentService.getCanceledOrCompletedAppointments(
      sabhaId,
      departmentId,
    );
  }

  // Get details of a specific canceled or completed appointment by ID
  @Get('canceled-or-completed/:id')
  async getCanceledOrCompletedAppointmentDetails(@Param('id') id: number) {
    return this.appointmentService.getCanceledOrCompletedAppointmentDetails(id);
  }
  @Get('user')
async getUserAppointments(@Query('userId') userId: number) {
  return this.appointmentService.getUserAppointments(userId);
}
}
