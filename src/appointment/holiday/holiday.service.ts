import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Holiday } from './holiday.model';

@Injectable()
export class HolidayService {
    constructor(
        @InjectModel(Holiday)
        private holidayModel: typeof Holiday
    ) {}

    async addHoliday(holiday: Holiday): Promise<Holiday> {
        return this.holidayModel.create(holiday);
    }

    async getHolidayDates(): Promise<string[]> {
        const holidays = await this.holidayModel.findAll({
            attributes: ['holidayDate'], // Only fetch the `holidayDate` field
        });

        // Explicitly cast `holidayDate` to a Date object
        return holidays.map(holiday => new Date(holiday.holidayDate).toISOString().split('T')[0]);
    }
}