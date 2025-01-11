import { Module } from '@nestjs/common';
import { GroundReservationController } from './ground-reservation.controller';
import { GroundReservationService } from './ground-reservation.service';
import { GroundReservation } from './ground-reservation.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../../user/user.model';
import { Sabha } from '../../../sabha/sabha.model';
import { Ground } from '../ground/ground.model';


@Module({
  imports: [SequelizeModule.forFeature([ Sabha, User, Ground, GroundReservation] )],
  controllers: [GroundReservationController],
  providers: [GroundReservationService]
})
export class GroundReservationModule {}
