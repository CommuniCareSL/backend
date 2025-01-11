import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ground } from './ground.model';

@Injectable()
export class GroundService {
  constructor(
    @InjectModel(Ground) private groundModel: typeof Ground,
  ) {}

  async getAllGrounds(): Promise<Ground[]> {
    return this.groundModel.findAll();
  }

  async getGroundsBySabhaId(sabhaId: number): Promise<Partial<Ground>[]> {
    return this.groundModel.findAll({
      where: { sabhaId },
      attributes: ['groundId','name', 'sabhaId', 'area', 'terms','pricePerDay', 'note'], // Specify the fields to include
    });
  }
}