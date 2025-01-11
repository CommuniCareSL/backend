import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GroundReservation } from './ground-reservation.model';

@Injectable()
export class GroundReservationService {
  constructor(
    @InjectModel(GroundReservation)
    private groundReservationModel: typeof GroundReservation,
  ) {}

  // Fetch booked dates with status = 0 for a specific ground
  async getBookedDatesByGroundId(groundId: number): Promise<string[]> {
    const reservations = await this.groundReservationModel.findAll({
      where: {
        groundId,
        status: 0, // Fetch only booked reservations (status = 0)
      },
      attributes: ['reservationDate'], // Only fetch the reservationDate field
    });

    // Extract and format dates as 'YYYY-MM-DD'
    return reservations.map((reservation) =>
      reservation.reservationDate.toISOString().split('T')[0],
    );
  }
}