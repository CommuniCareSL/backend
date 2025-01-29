import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createGround(groundData: Partial<Ground>): Promise<Ground> {
    return this.groundModel.create(groundData);
  }

  async updateGround(groundId: number, groundData: Partial<Ground>): Promise<Ground> {
    const ground = await this.groundModel.findByPk(groundId);
    
    if (!ground) {
      throw new NotFoundException(`Ground with ID ${groundId} not found`);
    }

    return ground.update(groundData);
  }

  async deleteGround(groundId: number): Promise<boolean> {
    const deletedCount = await this.groundModel.destroy({
      where: { groundId },
    });

    return deletedCount > 0;
  }
}