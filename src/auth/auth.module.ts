import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { EmployeesModule } from '../employees/employees.module';

@Module({
  imports: [
    forwardRef(() => EmployeesModule), // <-- Use forwardRef here
    PassportModule,
    JwtModule.register({
      secret: '843567893696976453275974432697R634976R738467TR678T34865R6834R8763T478378637664538745673865783678548735687R3', // Replace with environment variable in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
