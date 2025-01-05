import { Injectable, Inject, forwardRef, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from '../employees/employees.service';
import { Employees } from '../employees/employees.model';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => EmployeesService))
    private readonly employeesService: EmployeesService,
    private readonly jwtService: JwtService,
  ) {}

  async validateEmployee(email: string, password: string): Promise<Employees> {
    console.log('Attempting login with email:', email);
    const employee = await this.employeesService.findByEmail(email);
    
    if (!employee) {
      console.log('No employee found with email:', email);
      throw new UnauthorizedException('Invalid email or password');
    }
    
    console.log('Found employee, comparing passwords');
    console.log('Provided password:', password);
    console.log('Stored password:', employee.password);
    
    if (employee.password !== password) {
      console.log('Password mismatch');
      throw new UnauthorizedException('Invalid email or password');
    }
    
    return employee;
  }

  async login(employee: Employees) {
    if (!employee || !employee.employeeId) {
      throw new UnauthorizedException('Invalid employee data');
    }

    const payload = { 
      employeeId: employee.employeeId,
      email: employee.email,
      role: employee.role 
    };

    return {
      access_token: this.jwtService.sign(payload),
      employee: {
        employeeId: employee.employeeId,
        email: employee.email,
        role: employee.role,
        name: employee.name
      }
    };
  }
}