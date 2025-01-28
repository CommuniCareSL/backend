import { Controller, Get,Put,Delete,Body,Post, Param, NotFoundException } from '@nestjs/common';
import { GroundService } from './ground.service';
import { Ground } from './ground.model';

@Controller('ground')
export class GroundController {
  constructor(private readonly groundService: GroundService) {}

  @Get('all')
  async getAllGrounds(): Promise<Ground[]> {
    return this.groundService.getAllGrounds();
  }

  @Get('sabha/:id')
  async getGroundsBySabhaId(@Param('id') sabhaId: number) {
    const grounds = await this.groundService.getGroundsBySabhaId(sabhaId);
    if (!grounds || grounds.length === 0) {
      throw new NotFoundException(`No grounds found for sabhaId: ${sabhaId}`);
    }
    return grounds;
  }

  @Post()
  async createGround(@Body() groundData: Partial<Ground>): Promise<Ground> {
    return this.groundService.createGround(groundData);
  }

  @Put(':id')
  async updateGround(
    @Param('id') groundId: number,
    @Body() groundData: Partial<Ground>,
  ): Promise<Ground> {
    const ground = await this.groundService.updateGround(groundId, groundData);
    if (!ground) {
      throw new NotFoundException(`Ground with ID ${groundId} not found`);
    }
    return ground;
  }

  @Delete(':id')
  async deleteGround(@Param('id') groundId: number): Promise<void> {
    const deleted = await this.groundService.deleteGround(groundId);
    if (!deleted) {
      throw new NotFoundException(`Ground with ID ${groundId} not found`);
    }
  }
}