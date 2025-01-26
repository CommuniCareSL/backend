import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { HallReservationService } from './hall-reservation.service';

@Controller('hall-reservation')
export class HallReservationController {
  constructor(
    private readonly hallReservationService: HallReservationService,
  ) {}

  // Endpoint to fetch booked dates for a specific ground
  @Get('booked-dates/:hallId')
  async getBookedDates(@Param('hallId') hallId: number) {
    return this.hallReservationService.getBookedDatesByHallId(hallId);
  }

  @Post()
  async createReservation(@Body() reservationData: any) {
    console.log('Request Body:', reservationData); // Log the request body
    return this.hallReservationService.createReservation(reservationData);
  }
}