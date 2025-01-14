import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Holiday } from './holiday.model';

@Injectable()
export class HolidayService {
  constructor(
    @InjectModel(Holiday)
    private holidayModel: typeof Holiday,
  ) {}

  async addHoliday(holiday: {
    holidayDate: string;
    reason: string;
  }): Promise<Holiday> {
    // Convert the `holidayDate` string to a Date object
    const holidayDate = new Date(holiday.holidayDate);

    return this.holidayModel.create({
      holidayDate,
      reason: holiday.reason,
    });
  }

  async getHolidayDates(): Promise<string[]> {
    const holidays = await this.holidayModel.findAll({
      attributes: ['holidayDate'], // Only fetch the `holidayDate` field
    });

    // Explicitly cast `holidayDate` to a Date object
    return holidays.map(
      (holiday) => new Date(holiday.holidayDate).toISOString().split('T')[0],
    );
  }
}
