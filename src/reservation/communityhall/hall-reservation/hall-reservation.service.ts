import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HallReservation } from './hall-reservation.model';
import { Hall } from '../hall/hall.model';

@Injectable()
export class HallReservationService {
  constructor(
    @InjectModel(HallReservation)
    private hallReservationModel: typeof HallReservation,
    @InjectModel(Hall) private hallModel: typeof Hall,
  ) {}

  async getBookedDatesByHallId(hallId: number): Promise<string[]> {
    const reservations = await this.hallReservationModel.findAll({
      where: { hallId, status: 0 },
      attributes: ['reservationDate'],
    });
    return reservations.map(r => r.reservationDate.toISOString().split('T')[0]);
  }

  async createReservation(reservationData: any): Promise<HallReservation> {
    const { date, totalPayment, hallId } = reservationData;
    
    if (!date) throw new Error('Date is required');
    
    const hall = await this.hallModel.findByPk(hallId);
    if (!hall) throw new Error('Hall not found');
    if (hall.pricePerDay !== totalPayment) throw new Error('Payment mismatch');

    return this.hallReservationModel.create({
      ...reservationData,
      reservationDate: date,
      payment: totalPayment,
      status: 0,
    });
  }
}