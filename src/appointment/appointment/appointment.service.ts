import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from './appointment.model'; // Your Sequelize model

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment)
    private appointmentModel: typeof Appointment,
  ) {}

  async checkTimeSlotAvailability(
    sabhaId: number,
    departmentId: number,
    selectedDate: string,
  ): Promise<number[]> {
    try {
        console.log('sabhaId:', sabhaId, 'departmentId:', departmentId, 'selectedDate:', selectedDate);
      // Query the database for appointments matching the criteria
      const appointments = await this.appointmentModel.findAll({
        where: {
          sabhaId,
          departmentId,
          date: selectedDate,
        },
        attributes: ['timeSlot'], // Only fetch the timeSlot field
      });

      // Extract the time slots and convert them to decimal format
      const bookedSlots = appointments.map((appointment) => {
        const [time, period] = appointment.timeSlot.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        let decimalTime = hours + minutes / 60;
        if (period === 'PM' && hours !== 12) decimalTime += 12; // Convert to 24-hour format
        return decimalTime;
      });

      return bookedSlots;
    } catch (error) {
      console.error('Failed to fetch booked slots:', error);
      throw new Error('Failed to fetch booked slots');
    }
  }
}