import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GullyReservationController } from './gully-reservation.controller';
import { GullyReservationService } from './gully-reservation.service';
import { GullyReservation } from './gully-reservation.model';
import { User } from '../../../user/user.model';

@Module({
  imports: [SequelizeModule.forFeature([GullyReservation, User])],
  controllers: [GullyReservationController],
  providers: [GullyReservationService],
})
export class GullyReservationModule {}
