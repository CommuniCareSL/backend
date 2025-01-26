import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CrematoriumReservation } from './crematorium-reservation.model';
import { CrematoriumReservationController } from './crematorium-reservation.controller';
import { CrematoriumReservationService } from './crematorium-reservation.service';
import { User } from '../../../user/user.model';
import { Crematorium } from '../crematorium/crematorium.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Crematorium, CrematoriumReservation])
  ],
  controllers: [CrematoriumReservationController],
  providers: [CrematoriumReservationService]
})
export class CrematoriumReservationModule {}
