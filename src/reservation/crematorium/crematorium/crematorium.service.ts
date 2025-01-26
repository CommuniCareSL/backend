import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Crematorium } from './crematorium.model';

@Injectable()
export class CrematoriumService {
  constructor(
    @InjectModel(Crematorium) private crematoriumModel: typeof Crematorium,
  ) {}

  async getAllCrematoriums(): Promise<Crematorium[]> {
    return this.crematoriumModel.findAll();
  }

  async getCrematoriumsBySabhaId(sabhaId: number): Promise<Partial<Crematorium>[]> {
    return this.crematoriumModel.findAll({
      where: { sabhaId },
      attributes: ['crematoriumId','name', 'sabhaId', 'area', 'terms','price', 'note'], // Specify the fields to include
    });
  }
}