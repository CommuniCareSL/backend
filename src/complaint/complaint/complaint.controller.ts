import { Body, Controller, Post, Get, Put, Query, Param, NotFoundException } from '@nestjs/common';
import { ComplaintService } from './complaint.service';

@Controller('complaint')
export class ComplaintController {
  constructor(private readonly complaintService: ComplaintService) {}

  @Post()
  async createComplaint(@Body() complaintData: any) {
    try {
      const complaint =
        await this.complaintService.createComplaint(complaintData);
      return {
        message: 'Complaint submitted successfully',
        complaint,
      };
    } catch (error) {
      console.error('Error processing complaint:', error);
      throw error;
    }
  }

  @Get()
  async getComplaints(
    @Query('departmentId') departmentId: number,
    @Query('sabhaId') sabhaId: number,
  ) {
    try {
      const complaints =
        await this.complaintService.getComplaintsByDepartmentAndSabha(
          departmentId,
          sabhaId,
        );
      return {
        message: 'Complaints fetched successfully',
        complaints,
      };
    } catch (error) {
      console.error('Error fetching complaints:', error);
      throw error;
    }
  }

  @Get('/:id') // Define the endpoint with a dynamic parameter `id`
  async getComplaint(@Param('id') complaintId: number) {
    try {
      const complaint =
        await this.complaintService.getComplaintById(complaintId);
      return {
        message: 'Complaint fetched successfully',
        complaint,
      };
    } catch (error) {
      throw new NotFoundException('Complaint not found'); // Handle the error
    }
  }

  @Put(':complaintId/status')
  async updateComplaintStatus(
    @Param('complaintId') complaintId: string,
    @Body('status') status: number,
  ) {
    try {
      const updatedComplaint =
        await this.complaintService.updateComplaintStatus(+complaintId, status);
      return {
        message: 'Status updated successfully',
        complaint: updatedComplaint,
      };
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  }

  // Add a note to a complaint
  @Post(':complaintId/note')
  async addNoteToComplaint(
    @Param('complaintId') complaintId: string,
    @Body('note') note: string,
  ) {
    try {
      const updatedComplaint = await this.complaintService.addNoteToComplaint(
        +complaintId,
        note,
      );
      return {
        message: 'Note added successfully',
        complaint: updatedComplaint,
      };
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  }

  // Update a note in a complaint
  @Put(':complaintId/note')
  async updateNoteInComplaint(
    @Param('complaintId') complaintId: string,
    @Body('note') note: string,
  ) {
    try {
      const updatedComplaint =
        await this.complaintService.updateNoteInComplaint(+complaintId, note);
      return {
        message: 'Note updated successfully',
        complaint: updatedComplaint,
      };
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  }


  // status chinthanaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
@Get('/user/:userId')
async getUserComplaints(@Param('userId') userId: number) {
  try {
    const complaints = await this.complaintService.getComplaintsByUser(userId);
    return {
      message: 'User complaints fetched successfully',
      complaints,
    };
  } catch (error) {
    console.error('Error fetching user complaints:', error);
    throw error;
  }
}
}
