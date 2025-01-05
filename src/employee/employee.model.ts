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
  tableName: 'employee',
  timestamps: false, // Set to true if you want createdAt/updatedAt automatically
})
export class Employee extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  employeeId: number;

  @Column({ 
    type: DataType.STRING, 
    allowNull: false,
  })
  email: string;

  @Column({ type: DataType.STRING })
  address: string;

  @Column({ type: DataType.STRING })
  nic: string;

  @Column({ type: DataType.STRING })
  district: string;

  @ForeignKey(() => Sabha)
  @Column({ type: DataType.INTEGER}) // Map if DB column uses snake_case
  sabhaId: number;

  @BelongsTo(() => Sabha)
  sabha: Sabha;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ 
    type: DataType.STRING, 
    allowNull: false, 
  })
  password: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'employee',
  })
  role: string;

  @ForeignKey(() => Department)
  @Column({ type: DataType.INTEGER}) // Map if DB column uses snake_case
  departmentId: number;

  @BelongsTo(() => Department)
  department: Department;
}
