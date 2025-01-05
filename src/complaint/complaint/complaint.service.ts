import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Complaint } from './complaint.model';
import { User } from '../../user/user.model';
import { ComplaintCategory } from '../complaint-category/complaint-category.model';
import { Sabha } from '../../sabha/sabha.model';

@Injectable()
export class ComplaintService {
  constructor(
    @InjectModel(Complaint) private complaintModel: typeof Complaint,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(ComplaintCategory) private categoryModel: typeof ComplaintCategory,
    @InjectModel(Sabha) private sabhaModel: typeof Sabha,
  ) {}

  async createComplaint(complaintData: any) {
    const { categoryId, userId, locationRemarks, description, latitude, longitude, images } = complaintData;

    // Store images as JSON objects (Base64 + metadata)
    const proofs = images.length ? images : [];  // Store images array as JSONB

    const complaint = await this.complaintModel.create({
      categoryId,
      userId: userId === 0 ? null : userId, // Check if user is anonymous
      location: `${latitude},${longitude}`,
      remark: locationRemarks || '',
      description: description || '',
      proofs,  // Store JSONB array of images
      status: 0, // Default status - Pending
      sabhaId: 1, // Set sabhaId logic based on your requirements
    });

    return complaint;
  }
}
