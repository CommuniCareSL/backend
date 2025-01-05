import { Injectable } from '@nestjs/common';
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
          result.types.includes('neighborhood')
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
}