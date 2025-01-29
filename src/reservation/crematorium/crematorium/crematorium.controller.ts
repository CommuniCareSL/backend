import { Controller, Get, Param, NotFoundException, Post, Body, Put, Delete } from '@nestjs/common';
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


  @Post()
  async createCrematorium(@Body() crematoriumData: Partial<Crematorium>): Promise<Crematorium> {
    return this.crematoriumService.createCrematorium(crematoriumData);
  }

  @Put(':id')
  async updateCrematorium(
    @Param('id') crematoriumId: number,
    @Body() crematoriumData: Partial<Crematorium>,
  ): Promise<Crematorium> {
    const crema = await this.crematoriumService.updateCrematorium(crematoriumId, crematoriumData);
    if (!crema) {
      throw new NotFoundException(`Ground with ID ${crematoriumId} not found`);
    }
    return crema;
  }

  @Delete(':id')
  async deleteCrematorium(@Param('id') crematoriumId: number): Promise<void> {
    const deleted = await this.crematoriumService.deleteCrematorium(crematoriumId);
    if (!deleted) {
      throw new NotFoundException(`Ground with ID ${crematoriumId} not found`);
    }
  }
}