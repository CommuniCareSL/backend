import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Hall } from './hall.model';

@Injectable()
export class HallService {
  constructor(
    @InjectModel(Hall) private hallModel: typeof Hall,
  ) {}

  async getAllHalls(): Promise<Hall[]> {
    return this.hallModel.findAll();
  }

  async getHallsBySabhaId(sabhaId: number): Promise<Partial<Hall>[]> {
    return this.hallModel.findAll({
      where: { sabhaId },
      attributes: ['hallId','name', 'sabhaId', 'area', 'terms','pricePerDay', 'note'], // Specify the fields to include
    });
  }
}