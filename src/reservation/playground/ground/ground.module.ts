import { Module } from '@nestjs/common';
import { GroundService } from './ground.service';
import { GroundController } from './ground.controller';
import { Sabha } from '../../../sabha/sabha.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ground } from './ground.model';


@Module({
  imports: [SequelizeModule.forFeature([ Sabha, Ground ])],
  providers: [GroundService],
  controllers: [GroundController]
})
export class GroundModule {}
