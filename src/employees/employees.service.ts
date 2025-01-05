import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employees } from './employees.model';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employees)
    private readonly employeesModel: typeof Employees,
  ) {}

  async findByEmail(email: string): Promise<Employees | null> {
    console.log('Searching for email:', email);
    const employee = await this.employeesModel.findOne({ 
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

