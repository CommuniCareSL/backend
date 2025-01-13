import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './employee.model';
import { Sabha } from '../sabha/sabha.model';
import { Department } from '../department/department.model';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee)
    private readonly employeeModel: typeof Employee,
    @InjectModel(Sabha)
    private readonly sabhaModel: typeof Sabha,
    @InjectModel(Department)
    private readonly departmentModel: typeof Department,
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
        'departmentId',
      ],
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
  //have to update sabha hasAdmin column
  async addAdmin(adminData: any) {
    try {
      const newAdmin = await this.employeeModel.create(adminData);
      return newAdmin;
    } catch (error) {
      console.error('Error adding admin:', error);
      throw new Error('Failed to add admin');
    }
  }

  async updateAdmin(employeeId: number, adminData: any) {
    console.log('Employee ID (Service):', employeeId); // Debugging
    console.log('Admin Data (Service):', adminData); // Debugging

    try {
      // Remove employeeId from the update data
      const { employeeId: _, ...updateData } = adminData;

      const [updatedRows] = await this.employeeModel.update(updateData, {
        where: { employeeId },
      });

      if (updatedRows === 0) {
        throw new Error('Admin not found or no changes made');
      }

      const updatedAdmin = await this.employeeModel.findOne({
        where: { employeeId },
      });

      return updatedAdmin;
    } catch (error) {
      console.error('Error updating admin:', error);
      throw new Error('Failed to update admin');
    }
  }



  // Fetch employees by sabhaId and include department details
  async getEmployeesBySabhaId(sabhaId: number): Promise<any[]> {
    const employees = await this.employeeModel.findAll({
      where: { sabhaId }, // Filter by sabhaId
      include: [
        {
          model: this.departmentModel, // Include department details
          attributes: ['departmentName'], // Only fetch departmentName
        },
      ],
      attributes: ['employeeId', 'name', 'departmentId'], // Fetch only required fields
    });

    // Map the result to include departmentName
    return employees.map((employee) => ({
      id: employee.employeeId,
      name: employee.name,
      department: employee.department.departmentName, // Access departmentName from the included model
    }));
  }

  // Fetch employee details by ID
  async getEmployeeById(employeeId: number): Promise<Employee> {
    const employee = await this.employeeModel.findOne({
      where: { employeeId },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return employee;
  }

  // Update employee details
  async updateEmployee(
    employeeId: number,
    updatedData: Partial<Employee>,
  ): Promise<Employee> {
    const employee = await this.employeeModel.findOne({
      where: { employeeId },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    // Update the employee details
    await employee.update(updatedData);
    return employee;
  }
  
}
