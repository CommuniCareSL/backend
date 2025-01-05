import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './employee.model';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee)
    private readonly employeeModel: typeof Employee,
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
}

