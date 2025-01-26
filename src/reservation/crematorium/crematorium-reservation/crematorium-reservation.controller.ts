import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { CrematoriumReservationService } from './crematorium-reservation.service';

@Controller('crematorium-reservation')
export class CrematoriumReservationController {
  constructor(
    private readonly reservationService: CrematoriumReservationService
  ) {}

  @Get('booked-slots/:crematoriumId')
  async getBookedSlots(
    @Param('crematoriumId') crematoriumId: number,
    @Query('date') date: string
  ) {
    return this.reservationService.getBookedSlots(crematoriumId, date);
  }

  @Post()
  async createReservation(@Body() reservationData: any) {
    return this.reservationService.createReservation(reservationData);
  }
}