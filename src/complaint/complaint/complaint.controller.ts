import { Body, Controller, Post } from '@nestjs/common';
import { ComplaintService } from './complaint.service';

@Controller('complaint')
export class ComplaintController {
    constructor(private readonly complaintService: ComplaintService) {}
  
    @Post()
    async createComplaint(@Body() complaintData: any) {
      try {
        const complaint = await this.complaintService.createComplaint(complaintData);
        return {
          message: 'Complaint submitted successfully',
          complaint,
        };
      } catch (error) {
        console.error('Error processing complaint:', error);
        throw error;
      }
    }
  }