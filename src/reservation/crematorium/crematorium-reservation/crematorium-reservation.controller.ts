import { Controller, Get, Param, Post, Body, Query, Put, ParseIntPipe } from '@nestjs/common';
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

  // @Put('reject/:reservationId')
  // async rejectReservation(
  //   @Param('reservationId', ParseIntPipe) reservationId: number,
  //   @Body() data: { note: string }
  // ) {
  //   return this.reservationService.rejectReservation(reservationId, data.note);
  // }
}
