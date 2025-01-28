import { Controller, Get, Param, Post, Body,Put,ParseIntPipe } from '@nestjs/common';
import { GroundReservationService } from './ground-reservation.service';

@Controller('ground-reservation')
export class GroundReservationController {
  constructor(
    private readonly groundReservationService: GroundReservationService,
  ) {}

  // Endpoint to fetch booked dates for a specific ground
  @Get('booked-dates/:groundId')
  async getBookedDates(@Param('groundId') groundId: number) {
    return this.groundReservationService.getBookedDatesByGroundId(groundId);
  }

  @Post()
  async createReservation(@Body() reservationData: any) {
    console.log('Request Body:', reservationData); // Log the request body
    return this.groundReservationService.createReservation(reservationData);
  }



  @Get('active-reservations/:sabhaId')
  async getActiveReservations(@Param('sabhaId') sabhaId: number) {
    return this.groundReservationService.getActiveReservationsBySabhaId(sabhaId);
  }

  @Put('reject/:reservationId')
  async rejectReservation(
    @Param('reservationId', ParseIntPipe) reservationId: number,
    @Body() data: { note: string }
  ) {
    return this.groundReservationService.rejectReservation(reservationId, data.note);
  }

  @Get('previous-and-canceled-reservations/:sabhaId')
    async getPreviousAndCanceledReservations(
        @Param('sabhaId', ParseIntPipe) sabhaId: number
    ) {
        return this.groundReservationService.getPreviousAndCanceledReservationsBySabhaId(sabhaId);
    }
}