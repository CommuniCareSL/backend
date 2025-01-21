import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HolidayService } from './holiday.service';
import { HolidayController } from './holiday.controller';
import { Holiday } from './holiday.model';

@Module({
      imports: [SequelizeModule.forFeature([ Holiday ] )],
    providers: [HolidayService],
    controllers: [HolidayController],
})
export class HolidayModule {}