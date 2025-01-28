import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
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

  
}