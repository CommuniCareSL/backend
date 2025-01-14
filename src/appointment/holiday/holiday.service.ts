import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Holiday } from './holiday.model';

@Injectable()
export class HolidayService {
    constructor(
        @InjectModel(Holiday)
        private holidayModel: typeof Holiday
    ) {}
}