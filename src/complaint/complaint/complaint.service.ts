import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Complaint } from './complaint.model';
import { User } from '../../user/user.model';
import { ComplaintCategory } from '../complaint-category/complaint-category.model';
import { Sabha } from '../../sabha/sabha.model';
import axios from 'axios';

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
  
    const proofs = images.length ? images : [];
    const googleApiKey = 'AIzaSyBz4axrGtEMC2pyJ3xJ7hVf9TsfvFe3L0E';
  
    let area = null;
    if (latitude && longitude) {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleApiKey}`
        );
        
        // Search through all results for neighborhood
        const neighborhoodResult = response.data.results.find((result: any) => 
          result.types.includes('neighborhood')
        );
        
        if (neighborhoodResult) {
          // If neighborhood is found, use its first address component
          area = neighborhoodResult.address_components[0].long_name;
        } else {
          // If no neighborhood, look for locality in the first result
          const firstResult = response.data.results[0];
          if (firstResult) {
            const localityComponent = firstResult.address_components.find((component: any) =>
              component.types.includes('locality')
            );
            area = localityComponent?.long_name || null;
          }
        }
        
      } catch (error) {
        console.error('Error fetching area from Google Maps API:', error.message);
      }
    }
  
    const complaint = await this.complaintModel.create({
      categoryId,
      userId: userId === 0 ? null : userId,
      location: `${latitude},${longitude}`,
      remark: locationRemarks || '',
      description: description || '',
      proofs,
      status: 0,
      sabhaId: 1,
      area,
    });
  
    return complaint;
  }
}
