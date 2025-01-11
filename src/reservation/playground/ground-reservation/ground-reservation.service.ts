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

  async createReservation(reservationData: any): Promise<GroundReservation[]> {
    const { dates, totalPayment, ...rest } = reservationData;

    // Check if required fields are missing
    if (!dates || !totalPayment) {
      throw new Error('dates and totalPayment are required fields.');
    }

    // Calculate payment per date
    const paymentPerDate = totalPayment / dates.length;

    // Create a reservation for each date
    const reservations = await Promise.all(
      dates.map(async (date: string) => {
        return this.groundReservationModel.create({
          ...rest,
          reservationDate: date,
          payment: paymentPerDate,
          status: 0, // Set status to 0 (Booked)
        });
      }),
    );

    return reservations;
  }
}