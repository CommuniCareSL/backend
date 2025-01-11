import { Controller, Get, Param } from '@nestjs/common';
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
}