import { Module } from '@nestjs/common';
import { HallService } from './hall.service';
import { HallController } from './hall.controller';
import { Sabha } from '../../../sabha/sabha.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Hall } from './hall.model';


@Module({
  imports: [SequelizeModule.forFeature([ Sabha, Hall ])],
  providers: [HallService],
  controllers: [HallController]
})
export class HallModule {}
