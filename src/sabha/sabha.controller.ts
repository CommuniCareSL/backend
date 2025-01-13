import { Controller, Get, Query } from '@nestjs/common';
import { SabhaService } from './sabha.service';
import { Sabha } from './sabha.model';

@Controller('sabha')
export class SabhaController {
  constructor(private readonly sabhaService: SabhaService) {}

  @Get('forDistrict')
  async getSabhasForDistrict(@Query('district') district: string): Promise<Sabha[]> {
    return this.sabhaService.findSabhasByDistrict(district);
  }
}