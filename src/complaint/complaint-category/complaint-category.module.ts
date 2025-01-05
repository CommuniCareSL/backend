import { Module } from '@nestjs/common';
import { Sabha } from '../../sabha/sabha.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ComplaintCategoryService } from './complaint-category.service';
import { ComplaintCategory } from './complaint-category.model';

@Module({
  imports: [SequelizeModule.forFeature([ Sabha, ComplaintCategory])],
  providers: [ComplaintCategoryService]
})
export class ComplaintCategoryModule {}
