import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { HallService } from './hall.service';
import { Hall } from './hall.model';

@Controller('hall')
export class HallController {
  constructor(private readonly hallService: HallService) {}

  @Get('all')
  async getAllHalls(): Promise<Hall[]> {
    return this.hallService.getAllHalls();
  }

  @Get('sabha/:id')
  async getHallsBySabhaId(@Param('id') sabhaId: number) {
    const halls = await this.hallService.getHallsBySabhaId(sabhaId);
    if (!halls || halls.length === 0) {
      throw new NotFoundException(`No hallss found for sabhaId: ${sabhaId}`);
    }
    return halls;
  }
}