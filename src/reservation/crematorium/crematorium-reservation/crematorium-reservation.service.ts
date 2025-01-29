import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CrematoriumReservation } from './crematorium-reservation.model';
import { Crematorium } from '../crematorium/crematorium.model';

@Injectable()
export class CrematoriumReservationService {
  constructor(
    @InjectModel(CrematoriumReservation)
    private reservationModel: typeof CrematoriumReservation,
    @InjectModel(Crematorium) private crematoriumModel: typeof Crematorium,
  ) {}

  async getBookedSlots(crematoriumId: number, date: string): Promise<string[]> {
    if (!date || isNaN(new Date(date).getTime())) {
      throw new Error('Invalid date format');
    }

    const reservations = await this.reservationModel.findAll({
      where: {
        crematoriumId,
        funeralDate: date,
        status: 0
      },
      attributes: ['timeSlot'],
    });
    return reservations.map(r => r.timeSlot);
  }

  async createReservation(reservationData: any) {
    const crematorium = await this.crematoriumModel.findByPk(reservationData.crematoriumId);
    if (!crematorium) throw new Error('Crematorium not found');
    
    if (crematorium.price !== reservationData.payment) {
      throw new Error('Payment amount mismatch');
    }

    const existingReservation = await this.reservationModel.findOne({
      where: {
        crematoriumId: reservationData.crematoriumId,
        funeralDate: reservationData.funeralDate,
        timeSlot: reservationData.timeSlot,
        status: 0
      }
    });

    if (existingReservation) {
      throw new Error('This time slot is already booked for the selected date');
    }

    return this.reservationModel.create({
      ...reservationData,
      reservationDate: new Date().toISOString().split('T')[0],
      status: 0
    });
  }
}

