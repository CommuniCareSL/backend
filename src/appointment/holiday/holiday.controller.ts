import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { HolidayService } from './holiday.service';
import { Holiday } from './holiday.model';

@Controller('holiday')
export class HolidayController {
    constructor(private readonly holidayService: HolidayService) {}

    @Post()
    async addHoliday(@Body() holiday: Holiday): Promise<Holiday> {
        return this.holidayService.addHoliday(holiday);
    }

    @Get()
    async getHolidayDates(): Promise<string[]> {
        return this.holidayService.getHolidayDates();
    }
}