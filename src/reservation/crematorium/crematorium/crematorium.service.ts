import { Injectable, NotFoundException } from '@nestjs/common';
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
      attributes: ['crematoriumId','name', 'sabhaId', 'area', 'terms','price', 'note'],  
    });
  }

  async createCrematorium(crematoriumData: Partial<Crematorium>): Promise<Crematorium> {
    return this.crematoriumModel.create(crematoriumData);
  }

  async updateCrematorium(crematoriumId: number, crematoriumData: Partial<Crematorium>): Promise<Crematorium> {
    const crematorium = await this.crematoriumModel.findByPk(crematoriumId);
    
    if (!crematorium) {
      throw new NotFoundException(`Crematorium with ID ${crematoriumId} not found`);
    }

    return crematorium.update(crematoriumData);
  }

  async deleteCrematorium(crematoriumId: number): Promise<boolean> {
    const deletedCount = await this.crematoriumModel.destroy({
      where: { crematoriumId },
    });

    return deletedCount > 0;
  }
}