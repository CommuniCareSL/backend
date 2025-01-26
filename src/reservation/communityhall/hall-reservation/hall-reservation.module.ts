import { Module } from '@nestjs/common';
import { HallReservationController } from './hall-reservation.controller';
import { HallReservationService } from './hall-reservation.service';
import { HallReservation } from './hall-reservation.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../../user/user.model';
import { Sabha } from '../../../sabha/sabha.model';
import { Hall } from '../hall/hall.model';


@Module({
  imports: [SequelizeModule.forFeature([ Sabha, User, Hall,HallReservation] )],
  controllers: [HallReservationController],
  providers: [HallReservationService]
})
export class HallReservationModule {}
