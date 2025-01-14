import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from './appointment.model';

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
      // Query the database for appointments matching the criteria
      const appointments = await this.appointmentModel.findAll({
        where: {
          sabhaId,
          departmentId,
          date: selectedDate,
          status: [0, 2, 3], // Only include appointments with status 0 (Booked) or 3 (Completed)
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

  async bookAppointment(bookingData: {
    userId: number;
    sabhaId: number;
    serviceId: number;
    serviceTitle: string;
    departmentId: number;
    date: string;
    timeSlot: string;
    notes?: string;
  }): Promise<Appointment> {
    try {
      // Create a new appointment record in the database
      const appointment = await this.appointmentModel.create({
        userId: bookingData.userId,
        sabhaId: bookingData.sabhaId,
        serviceId: bookingData.serviceId,
        title: bookingData.serviceTitle,
        departmentId: bookingData.departmentId,
        date: bookingData.date,
        timeSlot: bookingData.timeSlot,
        note: bookingData.notes || null,
        status: 0, // Default status: 0 (Booked)
      });

      return appointment;
    } catch (error) {
      console.error('Failed to book appointment:', error);
      throw new Error('Failed to book appointment');
    }
  }
}