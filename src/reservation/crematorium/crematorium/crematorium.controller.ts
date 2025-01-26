import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { CrematoriumService } from './crematorium.service';
import { Crematorium } from './crematorium.model';

@Controller('crematorium')
export class CrematoriumController {
  constructor(private readonly crematoriumService: CrematoriumService) {}

  @Get('all')
  async getAllCrematoriums(): Promise<Crematorium[]> {
    return this.crematoriumService.getAllCrematoriums();
  }

  @Get('sabha/:id')
  async getCrematoriumsBySabhaId(@Param('id') sabhaId: number) {
    const crematoriums = await this.crematoriumService.getCrematoriumsBySabhaId(sabhaId);
    if (!crematoriums || crematoriums.length === 0) {
      throw new NotFoundException(`No crematoriums found for sabhaId: ${sabhaId}`);
    }
    return crematoriums;
  }
}