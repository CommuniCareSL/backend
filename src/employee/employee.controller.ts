import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: { email: string; password: string }
  ) {
    try {
      const employee = await this.authService.validateEmployee(
        loginDto.email,
        loginDto.password
      );
      
      return await this.authService.login(employee);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Login failed');
    }
  }
}