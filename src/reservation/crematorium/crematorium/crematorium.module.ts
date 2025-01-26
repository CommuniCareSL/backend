import { Module } from '@nestjs/common';
import { CrematoriumService } from './crematorium.service';
import { CrematoriumController } from './crematorium.controller';
import { Sabha } from '../../../sabha/sabha.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Crematorium } from './crematorium.model';


@Module({
  imports: [SequelizeModule.forFeature([ Sabha, Crematorium ])],
  providers: [CrematoriumService],
  controllers: [CrematoriumController]
})
export class CrematoriumModule {}
