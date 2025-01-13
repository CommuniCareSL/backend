import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './employee.model';
import { Sabha } from '../sabha/sabha.model';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee)
    private readonly employeeModel: typeof Employee,
    @InjectModel(Sabha)
    private readonly sabhaModel: typeof Sabha
  ) {}

  async findByEmail(email: string): Promise<Employee | null> {
    console.log('Searching for email:', email);
    const employee = await this.employeeModel.findOne({ 
      where: { email },
      attributes: [
        'employeeId',
        'email',
        'password',
        'name',
        'role',
        'sabhaId',
        'departmentId'
      ]
    });
    console.log('Database result:', JSON.stringify(employee, null, 2));
    return employee;
  }

  async getAdminsByDepartment(departmentId: number) {
    try {
      const admins = await this.employeeModel.findAll({
        where: { departmentId }, // Filter by departmentId
        include: [
          {
            model: this.sabhaModel,
            attributes: ['sabhaName'], // Include only the sabhaName from the Sabha model
          },
        ],
        attributes: [
          'employeeId',
          'name',
          'email',
          'district',
          'sabhaId',
          'departmentId',
        ], // Select specific fields from the Employee model
      });

      // Map the result to include sabhaName in the response
      return admins.map((admin) => ({
        employeeId: admin.employeeId,
        name: admin.name,
        email: admin.email,
        district: admin.district,
        sabhaId: admin.sabhaId,
        sabhaName: admin.sabha?.sabhaName || null, // Include sabhaName from the associated Sabha model
        departmentId: admin.departmentId,
      }));
    } catch (error) {
      console.error('Error fetching admins:', error);
      throw new Error('Failed to fetch admins');
    }
  }

  async getAdminById(employeeId: number): Promise<any> {
    const admin = await this.employeeModel.findOne({
      where: { employeeId },
      include: [
        {
          model: this.sabhaModel,
          attributes: ['sabhaName'], // Include only the sabhaName from the Sabha table
        },
      ],
    });

    if (!admin) {
      return null;
    }

    // Transform the result to include sabhaName directly in the response
    const result = admin.toJSON();
    result.sabhaName = admin.sabha.sabhaName;
    delete result.sabha; // Remove the nested sabha object

    return result;
  }
}

