import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HallReservation } from './hall-reservation.model';

@Injectable()
export class HallReservationService {
  constructor(
    @InjectModel(HallReservation)
    private hallReservationModel: typeof HallReservation,
  ) {}

  // Fetch booked dates with status = 0 for a specific hall
  async getBookedDatesByHallId(hallId: number): Promise<string[]> {
    const reservations = await this.hallReservationModel.findAll({
      where: {
        hallId,
        status: 0, // Only booked reservations
      },
      attributes: ['reservationDate'],
    });

    return reservations.map((reservation) =>
      reservation.reservationDate.toISOString().split('T')[0],
    );
  }

  // Create single-date reservation
  async createReservation(reservationData: any): Promise<HallReservation> {
    const { dates, totalPayment, ...rest } = reservationData;

    // Validation checks
    if (!dates || !Array.isArray(dates) || dates.length === 0) {
      throw new Error('At least one valid date is required');
    }
    if (!totalPayment || isNaN(totalPayment)) {
      throw new Error('Valid total payment is required');
    }

    // Create single reservation
    return this.hallReservationModel.create({
      ...rest,
      reservationDate: dates[0], // Use first date from array
      payment: totalPayment, // Use full amount directly
      status: 0,
    });
  }
}