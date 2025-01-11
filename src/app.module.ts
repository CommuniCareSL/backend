import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.module';
import { EmployeeController } from './employee/employee.controller';
import { EmployeeModule } from './employee/employee.module';
import { UserModule } from './user/user.module';
import { SabhaController } from './sabha/sabha.controller';
import { SabhaModule } from './sabha/sabha.module';
import { DepartmentController } from './department/department.controller';
import { DepartmentModule } from './department/department.module';
import { AuthModule } from './auth/auth.module';
import { ComplaintModule } from './complaint/complaint/complaint.module';
import { ComplaintCategoryModule } from './complaint/complaint-category/complaint-category.module';
import { ReservationCategoryModule } from './reservation/reservation-category/reservation-category.module';
import { GroundModule } from './reservation/playground/ground/ground.module';
import { GroundReservationModule } from './reservation/playground/ground-reservation/ground-reservation.module';

@Module({
  imports: [
    DatabaseModule,
    EmployeeModule,
    UserModule,
    SabhaModule,
    DepartmentModule,
    AuthModule,
    ComplaintModule,
    ComplaintCategoryModule,
    ReservationCategoryModule,
    GroundModule,
    GroundReservationModule,
  ],
  controllers: [AppController, EmployeeController, SabhaController, DepartmentController],
  providers: [AppService],
})
export class AppModule {}
