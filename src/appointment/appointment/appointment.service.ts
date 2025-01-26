import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from './appointment.model';
import { User } from 'src/user/user.model';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment)
    private appointmentModel: typeof Appointment,
    @InjectModel(User)
    private userModel: typeof User,
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


  // Get all appointments with status = 0, from the day after tomorrow onwards, ordered by creation date DESC
  async getBookedAppointments(sabhaId: number, departmentId: number) {
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2); // Day after tomorrow
    dayAfterTomorrow.setHours(0, 0, 0, 0); // Start of the day

    return this.appointmentModel.findAll({
      where: {
        sabhaId,
        departmentId,
        status: 0,
        date: {
          [Op.gte]: dayAfterTomorrow, // Only appointments from the day after tomorrow onwards
        },
      },
      order: [['date', 'ASC']], // Order by creation date in descending order
      include: [
        {
          model: this.userModel,
          attributes: ['fullName'], // Include the user's full name
        },
      ],
    });
  }

  // Get appointment details by ID, including the user's full name
  async getBookedAppointmentDetails(appointmentId: number) {
    return this.appointmentModel.findOne({
      where: { appointmentId },
      include: [
        {
          model: this.userModel,
          attributes: ['fullName'], // Include the user's full name
        },
      ],
    });
  }
}