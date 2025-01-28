import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { Complaint } from './complaint.model';
import { User } from '../../user/user.model';
import { ComplaintCategory } from '../complaint-category/complaint-category.model';
import { Sabha } from '../../sabha/sabha.model';
import axios from 'axios';
import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';
import { Op } from 'sequelize';

@Injectable()
export class ComplaintService {
  private areaMappings: any[] = [];

  constructor(
    @InjectModel(Complaint) private complaintModel: typeof Complaint,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(ComplaintCategory) private categoryModel: typeof ComplaintCategory,
    @InjectModel(Sabha) private sabhaModel: typeof Sabha,
    private configService: ConfigService,
  ) {
    this.loadExcelData();
  }

  private loadExcelData() {
    try {
      // Get the full path to Excel file
      const excelPath = path.join(process.cwd(), 'data', 'area-mappings.xlsx');
      console.log('Attempting to load Excel file from:', excelPath);

      // Check if file exists
      if (!fs.existsSync(excelPath)) {
        console.error(`Excel file not found at path: ${excelPath}`);
        return;
      }

      // Read the Excel file
      const workbook = XLSX.readFile(excelPath);
      console.log('Excel file read successfully');

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert to JSON and verify the data
      this.areaMappings = XLSX.utils.sheet_to_json(worksheet);
      console.log('Excel data loaded:', this.areaMappings.length, 'records');
      
      // Verify the data structure
      if (this.areaMappings.length > 0) {
        const firstRecord = this.areaMappings[0];
        if (!firstRecord.admin4Name_en || !firstRecord.admin3_Id) {
          console.error('Invalid Excel structure. Required columns: admin4Name_en, admin3_Id');
          console.error('Found columns:', Object.keys(firstRecord));
          this.areaMappings = [];
          return;
        }
        console.log('First record:', {
          area: firstRecord.admin4Name_en,
          sabhaId: firstRecord.admin3_Id
        });
      }

    } catch (error) {
      console.error('Error loading Excel data:', error);
      this.areaMappings = [];
    }
}

private findSabhaIdByArea(area: string): number {
    if (!area || !this.areaMappings.length) {
      console.log('No area provided or no mappings loaded. Using default sabhaId: 1');
      return 1;
    }
    
    const areaLower = area.toLowerCase();
    console.log('Searching for match for area:', areaLower);
    
    const match = this.areaMappings.find(mapping => {
      const areaName = mapping.admin4Name_en.toLowerCase();
      const isMatch = areaName === areaLower;
      
      if (isMatch) {
        console.log(`Match found: ${mapping.admin4Name_en} with sabhaId: ${mapping.admin3_Id}`);
      }
      return isMatch;
    });

    if (match) {
      const sabhaId = Number(match.admin3_Id);
      console.log('Found exact match, returning sabhaId:', sabhaId);
      return sabhaId;
    }

    // If no exact match, try partial match
    const partialMatch = this.areaMappings.find(mapping => {
      const areaName = mapping.admin4Name_en.toLowerCase();
      return areaLower.includes(areaName) || areaName.includes(areaLower);
    });

    if (partialMatch) {
      const sabhaId = Number(partialMatch.admin3_Id);
      console.log('Found partial match:', partialMatch.admin4Name_en, 'with sabhaId:', sabhaId);
      return sabhaId;
    }

    console.log('No match found in Excel data. Using default sabhaId: 1');
    return 1;
}

  async createComplaint(complaintData: any) {
    const { categoryId, userId, locationRemarks, description, latitude, longitude, images } = complaintData;
  
    const proofs = images.length ? images : [];
    const googleApiKey = this.configService.get<string>('GOOGLE_MAPS_API_KEY');
  
    let area = null;
    let sabhaId = 1;  // Default value

    if (latitude && longitude) {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleApiKey}`
        );
        
        // Search through all results for neighborhood
        const neighborhoodResult = response.data.results.find((result: any) => 
          result.types.includes('administrative_area_level_4')
        );
        
        if (neighborhoodResult) {
          // If neighborhood is found, use its first address component
          area = neighborhoodResult.address_components[0].long_name;
          console.log('Found neighborhood area:', area);
        } else {
          // If no neighborhood, look for locality in the first result
          const firstResult = response.data.results[0];
          if (firstResult) {
            const localityComponent = firstResult.address_components.find((component: any) =>
              component.types.includes('locality')
            );
            area = localityComponent?.long_name || null;
            console.log('Found locality area:', area);
          }
        }

        // Find matching sabhaId from Excel data
        if (area) {
          sabhaId = this.findSabhaIdByArea(area);
          console.log('Final sabhaId selected:', sabhaId);
        } else {
          console.log('No area found, using default sabhaId: 1');
        }
        
      } catch (error) {
        console.error('Error fetching area from Google Maps API:', error.message);
        console.log('Using default sabhaId due to error');
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
      sabhaId,  // Will be 1 if no match found, otherwise will be from Excel
      area,
    });
  
    return complaint;
  }

  // Method to get complaints based on departmentId and sabhaId
  async getComplaintsByDepartmentAndSabha(departmentId: number, sabhaId: number) {
    try {
      // Step 1: Fetch ComplaintCategory based on departmentId
      const categories = await this.categoryModel.findAll({
        where: { departmentId },
        attributes: ['complaintCategoryId', 'name'], // Fetch only necessary columns
      });

      if (!categories || categories.length === 0) {
        throw new Error('No categories found for the given departmentId');
      }

      // Extract categoryIds from the fetched categories
      const categoryIds = categories.map((category) => category.complaintCategoryId);

      // Step 2: Fetch Complaints based on categoryIds and sabhaId
      const complaints = await this.complaintModel.findAll({
        where: {
          categoryId: { [Op.in]: categoryIds }, // Match any of the categoryIds
          sabhaId, // Match the given sabhaId
        },
        attributes: ['complaintId', 'area', 'status', 'createdAt'], // Fetch only necessary columns
        include: [
          {
            model: ComplaintCategory,
            attributes: ['name'], // Include the category name
          },
        ],
      });

      console.log('Raw complaints data:', JSON.stringify(complaints, null, 2));

      if (!complaints || complaints.length === 0) {
        throw new Error('No complaints found for the given criteria');
      }

      // Step 3: Format the response to include the category name
      const formattedComplaints = complaints.map((complaint) => ({
        complaintId: complaint.complaintId,
        area: complaint.area,
        status: complaint.status,
        createdAt: complaint.createdAt,
        categoryName: complaint.complaintCategory.name, // Include the category name
      }));

      // Step 4: Return the formatted complaints
      return formattedComplaints;
    } catch (error) {
      console.error('Error fetching complaints:', error);
      throw error;
    }
  }

  async getComplaintById(complaintId: number) {
    try {
      const complaint = await this.complaintModel.findOne({
        where: { complaintId }, // Find the complaint by ID
        include: [
          {
            model: this.userModel, // Include the associated User model
            attributes: ['fullName'], // Only fetch the fullName field
          },
        ],
      });

      if (!complaint) {
        throw new Error('Complaint not found');
      }

      return complaint;
    } catch (error) {
      console.error('Error fetching complaint details:', error);
      throw error; // Throw the error to be handled by the caller
    }
  }

  async updateComplaintStatus(complaintId: number, status: number) {
    const complaint = await this.complaintModel.findByPk(complaintId);
  
    if (!complaint) {
      throw new NotFoundException('Complaint not found');
    }
  
    // Update the status
    complaint.status = status;
    complaint.updatedAt = new Date();
    await complaint.save(); // Save the updated complaint
    return complaint;
  }

  // Add a note to a complaint
  async addNoteToComplaint(complaintId: number, note: string) {
    const complaint = await this.complaintModel.findByPk(complaintId);

    if (!complaint) {
      throw new NotFoundException('Complaint not found');
    }

    // If a note already exists, append the new note
    if (complaint.note) {
      complaint.note = `${complaint.note}\n${note}`;
    } else {
      // If no note exists, set the new note
      complaint.note = note;
    }

    await complaint.save(); // Save the updated complaint
    return complaint;
  }

  // Update a note in a complaint
  async updateNoteInComplaint(complaintId: number, note: string) {
    const complaint = await this.complaintModel.findByPk(complaintId);

    if (!complaint) {
      throw new NotFoundException('Complaint not found');
    }

    // Update the note
    complaint.note = note;
    await complaint.save(); // Save the updated complaint
    return complaint;
  }

  // status chinthanaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
async getComplaintsByUser(userId: number) {
  try {
    const complaints = await this.complaintModel.findAll({
      where: { userId },
      include: [
        {
          model: ComplaintCategory,
          attributes: ['name'],
          required: true,
        },
        {
          model: Sabha,
          attributes: ['sabhaName'],
          required: true,
        },
        {
          model: User,
          attributes: ['fullName'],
        }
      ],
      order: [['createdAt', 'DESC']],
    });

    return complaints.map(complaint => ({
      id: complaint.complaintId,
      type: complaint.complaintCategory.name,
      sabhaName: complaint.sabha.sabhaName,
      status: this.mapStatus(complaint.status),
      description: complaint.description,
      createdAt: complaint.createdAt,
      updatedAt: complaint.updatedAt,
    }));
  } catch (error) {
    console.error('Error fetching user complaints:', error);
    throw error;
  }
}

private mapStatus(status: number): string {
  switch(status) {
    case 0: return 'Pending';
    case 1: return 'Rejected';
    case 2: return 'Ongoing';
    case 3: return 'Completed';
    default: return 'Unknown';
  }
}
}