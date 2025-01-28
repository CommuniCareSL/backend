import { Controller, Post, Body } from '@nestjs/common';
import { GullyReservationService } from './gully-reservation.service';

@Controller('gully-reservation')
export class GullyReservationController {
  constructor(private readonly service: GullyReservationService) {}

  @Post()
  async createReservation(@Body() reservationData: any) {
    return this.service.createReservation(reservationData);
  }
}