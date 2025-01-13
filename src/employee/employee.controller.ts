import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  Query,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly authService: AuthService,
    private readonly employeeService: EmployeeService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    try {
      const employee = await this.authService.validateEmployee(
        loginDto.email,
        loginDto.password,
      );

      return await this.authService.login(employee);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Login failed');
    }
  }

  @Get('admins')
  async getAdmins(@Query('departmentId') departmentId: number) {
    if (!departmentId) {
      throw new UnauthorizedException('Department ID is required');
    }
    return this.employeeService.getAdminsByDepartment(departmentId);
  }

  @Get('admin/:employeeId')
  async getAdminById(@Param('employeeId') employeeId: number) {
    const admin = await this.employeeService.getAdminById(employeeId);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }
}
