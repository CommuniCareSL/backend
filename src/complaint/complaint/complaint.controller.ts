import { Body, Controller, Post, Get, Query, Param, NotFoundException } from '@nestjs/common';
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
      const complaint = await this.complaintService.getComplaintById(complaintId);
      return {
        message: 'Complaint fetched successfully',
        complaint,
      };
    } catch (error) {
      throw new NotFoundException('Complaint not found'); // Handle the error
    }
  }
}
