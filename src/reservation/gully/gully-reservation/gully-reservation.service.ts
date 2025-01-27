import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GullyReservation } from './gully-reservation.model';

@Injectable()
export class GullyReservationService {
  constructor(
    @InjectModel(GullyReservation)
    private reservationModel: typeof GullyReservation,
  ) {}

  async createReservation(reservationData: any) {
    return this.reservationModel.create({
      ...reservationData,
      status: 0,
      createdAt: new Date(),
      updatedAt: null
    });
  }
}