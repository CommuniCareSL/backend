import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GroundReservation } from './ground-reservation.model';
import { Ground } from '../ground/ground.model';
import { User } from 'src/user/user.model';
import { Op } from 'sequelize'; 

@Injectable()
export class GroundReservationService {
  constructor(
    @InjectModel(GroundReservation)
    private groundReservationModel: typeof GroundReservation,
    @InjectModel(Ground)
    private groundModel: typeof Ground,
    @InjectModel(User)
    private userModel: typeof User,    
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


  async getActiveReservationsBySabhaId(sabhaId: number): Promise<GroundReservation[]> {
    // Step 1: Fetch all groundIds associated with the given sabhaId
    const grounds = await this.groundModel.findAll({
      where: { sabhaId },
      attributes: ['groundId'], // Only fetch the groundId
    });

    const groundIds = grounds.map(ground => ground.groundId);

    // Step 2: Calculate the date for the day after tomorrow
    const today = new Date();
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 3); // Add 3 days to today's date
    dayAfterTomorrow.setHours(0, 0, 0, 0); // Set time to 00:00:00 for comparison

    // Step 3: Fetch all reservations with status = 0, groundId in groundIds, and reservationDate >= dayAfterTomorrow
    const reservations = await this.groundReservationModel.findAll({
      where: {
        groundId: groundIds,
        status: 0,
        reservationDate: {
          [Op.gte]: dayAfterTomorrow, // Only include reservations from the day after tomorrow onwards
        },
      },
      include: [
        {
          model: User,
          attributes: ['userId', 'fullName'], // Include user's fullName
        },
        {
          model: Ground,
          attributes: ['groundId', 'name'], // Include ground details
        },
      ],
    });

    return reservations;
  }

  async rejectReservation(reservationId: number, note: string) {
    try {
      const reservation = await this.groundReservationModel.findByPk(reservationId);

      if (!reservation) {
        throw new NotFoundException(`Reservation with ID ${reservationId} not found`);
      }

      // Check if reservation date is within 2 days
      const reservationDate = new Date(reservation.reservationDate);
      const currentDate = new Date();
      const timeDifference = reservationDate.getTime() - currentDate.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      if (daysDifference <= 2) {
        throw new Error('Cannot reject reservations that are within 2 days of the reservation date');
      }

      // Update the reservation
      await reservation.update({
        status: 1, // Cancelled
        note: note,
        updatedAt: new Date(),
      });

      return {
        message: 'Reservation rejected successfully',
        reservation,
      };
    } catch (error) {
      console.error('Error rejecting reservation:', error);
      throw error;
    }
  }

  async getPreviousAndCanceledReservationsBySabhaId(sabhaId: number): Promise<{
    previousReservations: GroundReservation[];
    canceledReservations: GroundReservation[];
}> {
    // Step 1: Get all ground IDs for the sabha
    const grounds = await this.groundModel.findAll({
        where: { sabhaId },
        attributes: ['groundId'],
    });
    const groundIds = grounds.map(ground => ground.groundId);

    // Step 2: Get current date at start of day
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Step 3: Fetch both types of reservations in parallel
    const [previousReservations, canceledReservations] = await Promise.all([
        // Get previous active reservations (status = 0)
        this.groundReservationModel.findAll({
            where: {
                groundId: groundIds,
                status: 0,
                reservationDate: {
                    [Op.lt]: today, // Less than today
                },
            },
            include: [
                {
                    model: User,
                    attributes: ['userId', 'fullName'],
                },
                {
                    model: Ground,
                    attributes: ['groundId', 'name'],
                },
            ],
            order: [['reservationDate', 'DESC']], // Most recent first
        }),

        // Get all canceled reservations (status = 1)
        this.groundReservationModel.findAll({
            where: {
                groundId: groundIds,
                status: 1,
            },
            include: [
                {
                    model: User,
                    attributes: ['userId', 'fullName'],
                },
                {
                    model: Ground,
                    attributes: ['groundId', 'name'],
                },
            ],
            order: [['reservationDate', 'DESC']], // Most recent first
        }),
    ]);

    return {
        previousReservations,
        canceledReservations,
    };
}
}