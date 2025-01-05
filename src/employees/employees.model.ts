import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Department } from '../department/department.model';
import { Sabha } from '../sabha/sabha.model';

@Table({
  tableName: 'employees',
  timestamps: false, // Set to true if you want createdAt/updatedAt automatically
})
export class Employees extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'employee_id', // Map to the correct column name in the DB
  })
  employeeId: number;

  @Column({ 
    type: DataType.STRING, 
    allowNull: false, 
    validate: { isEmail: true }, // Add email format validation
  })
  email: string;

  @Column({ type: DataType.STRING })
  address: string;

  @Column({ type: DataType.STRING })
  nic: string;

  @Column({ type: DataType.STRING })
  district: string;

  @ForeignKey(() => Sabha)
  @Column({ type: DataType.INTEGER, field: 'sabha_id' }) // Map if DB column uses snake_case
  sabhaId: number;

  @BelongsTo(() => Sabha)
  sabha: Sabha;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ 
    type: DataType.STRING, 
    allowNull: false, 
    validate: { len: [8, 32] } // Optional: password validation for length
  })
  password: string;

  @Column({ type: DataType.STRING })
  role: string;

  @ForeignKey(() => Department)
  @Column({ type: DataType.INTEGER, field: 'department_id' }) // Map if DB column uses snake_case
  departmentId: number;

  @BelongsTo(() => Department)
  department: Department;
}
