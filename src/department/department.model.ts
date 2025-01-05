import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasMany,
  } from 'sequelize-typescript';
  import { Employees } from '../employees/employees.model';
  
  @Table({
    tableName: 'departments',
    timestamps: false, // Add this if you don't use createdAt/updatedAt
  })
  export class Department extends Model<Department> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    departmentId: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    departmentName: string;
  
    @HasMany(() => Employees)
    employees: Employees[];
  }
  