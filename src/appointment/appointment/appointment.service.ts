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

  async cancelBookedAppointment(appointmentId: number, cancelReason: string) {
    const appointment = await this.appointmentModel.findByPk(appointmentId);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    // Update status to 1 (cancelled) and save the cancellation reason
    appointment.status = 1;
    appointment.bcNote = cancelReason; // Save the cancellation reason in the note field
    await appointment.save();

    return appointment;
  }


  async getTodayAppointments(sabhaId: number, departmentId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of the day
  
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Start of the next day
  
    return this.appointmentModel.findAll({
      where: {
        sabhaId,
        departmentId,
        status: 0, // Assuming status 0 means "scheduled"
        date: {
          [Op.gte]: today, // Greater than or equal to today
          [Op.lt]: tomorrow, // Less than tomorrow (i.e., today only)
        },
      },
      order: [['timeSlot', 'ASC']], // Order by date in ascending order
      include: [
        {
          model: this.userModel,
          attributes: ['fullName'], // Include the user's full name
        },
      ],
    });
  }

  // Get appointment details by ID, including the user's full name
  async getTodayAppointmentDetails(appointmentId: number) {
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

  async cancelTodayAppointment(appointmentId: number, cancelReason: string) {
    const appointment = await this.appointmentModel.findByPk(appointmentId);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    // Update status to 1 (cancelled) and save the cancellation reason
    appointment.status = 1;
    appointment.tcNote = cancelReason; // Save the cancellation reason in the note field
    await appointment.save();

    return appointment;
  }

  async startTodayAppointment(appointmentId: number) {
    const appointment = await this.appointmentModel.findByPk(appointmentId);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    // Update status to "ongoing" (e.g., status = 2)
    appointment.status = 2; // Assuming 2 represents "ongoing"
    await appointment.save();

    return appointment;
  }

  // Get all ongoing appointments (status = 2)
  async getOngoingAppointments(sabhaId: number, departmentId: number) {
    return this.appointmentModel.findAll({
      where: {
        sabhaId,
        departmentId,
        status: 2, // Ongoing appointments
      },
      order: [['date', 'ASC']], // Order by date in ascending order
      include: [
        {
          model: this.userModel,
          attributes: ['fullName'], // Include the user's full name
        },
      ],
    });
  }

  // Get details of a specific ongoing appointment
  async getOngoingAppointmentDetails(appointmentId: number) {
    return this.appointmentModel.findOne({
      where: { appointmentId, status: 2 }, // Ensure the appointment is ongoing
      include: [
        {
          model: this.userModel,
          attributes: ['fullName'], // Include the user's full name
        },
      ],
    });
  }

  // Mark an ongoing appointment as completed (status = 3)
  async completeOngoingAppointment(appointmentId: number) {
    const appointment = await this.appointmentModel.findByPk(appointmentId);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    // Update status to 3 (completed)
    appointment.status = 3;
    await appointment.save();

    return appointment;
  }

  async cancelOngoingAppointment(appointmentId: number, cancelReason: string) {
    const appointment = await this.appointmentModel.findByPk(appointmentId);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    // Update status to 1 (cancelled) and save the cancellation reason
    appointment.status = 1;
    appointment.ocNote = cancelReason; // Save the cancellation reason in the note field
    await appointment.save();

    return appointment;
  }
}