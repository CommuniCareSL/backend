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
    tableName: 'sabha',
    timestamps: false, // Add this if you don't use createdAt/updatedAt
  })
  export class Sabha extends Model<Sabha> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    sabhaId: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
      field: 'sabha_name', // Maps to the sabha_name column
    })
    sabhaName: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    district: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: true, // Adjust if required
    })
    address: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
      unique: true,
      field: 'sabha_mail', // Maps to the sabha_mail column
    })
    sabhaMail: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
      validate: {
        is: /^\+?[0-9]{7,15}$/, // Validation for 7-15 digits, optional '+'
      },
    })
    contactNo: string;
  
    @HasMany(() => Employees)
    employees: Employees[];
  }
  