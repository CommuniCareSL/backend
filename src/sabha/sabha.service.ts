import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sabha } from './sabha.model';

@Injectable()
export class SabhaService {
  constructor(
    @InjectModel(Sabha)
    private readonly sabhaModel: typeof Sabha,
  ) {}

  async findSabhasByDistrict(district: string): Promise<Sabha[]> {
    return this.sabhaModel.findAll({
      where: {
        district,
        hasAdmin: false,
      },
    });
  }
}
