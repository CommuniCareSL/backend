import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  Query,
  Param,
  NotFoundException,
  Put,
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

  @Post('addAdmin')
  async addAdmin(@Body() adminData: any) {
    try {
      const newAdmin = await this.employeeService.addAdmin(adminData);
      return { message: 'Admin added successfully', data: newAdmin };
    } catch (error) {
      throw new UnauthorizedException('Failed to add admin');
    }
  }

  @Put('updateAdmin/:employeeId')
async updateAdmin(
  @Param('employeeId') employeeId: number, // Ensure this is a number
  @Body() adminData: any,
) {
  console.log('Employee ID (Controller):', employeeId); // Debugging
  console.log('Admin Data (Controller):', adminData); // Debugging

  try {
    const updatedAdmin = await this.employeeService.updateAdmin(
      employeeId,
      adminData,
    );
    return { message: 'Admin updated successfully', data: updatedAdmin };
  } catch (error) {
    throw new UnauthorizedException('Failed to update admin');
  }
}
}
