import { Module } from '@nestjs/common';
import { ReservationCategory } from './reservation-category.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReservationCategoryController } from './reservation-category.controller';
import { ReservationCategoryService } from './reservation-category.service';

@Module({
  imports: [SequelizeModule.forFeature([ ReservationCategory])],
  controllers: [ReservationCategoryController],
  providers: [ReservationCategoryService]
})
export class ReservationCategoryModule {}
