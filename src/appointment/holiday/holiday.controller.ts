import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { HolidayService } from './holiday.service';
import { Holiday } from './holiday.model';

@Controller('holiday')
export class HolidayController {
  constructor(private readonly holidayService: HolidayService) {}

  @Post()
  async addHoliday(@Body() body: { date: string; reason: string }) {
    const { date, reason } = body;
    return this.holidayService.addHoliday({ holidayDate: date, reason });
  }

  @Get()
  async getHolidayDates(): Promise<string[]> {
    return this.holidayService.getHolidayDates();
  }
}
