import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasMany,
  } from 'sequelize-typescript';
  import { Employee } from '../employee/employee.model';
  
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
    })
    sabhaMail: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    contactNo: string;

    @Column({
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    })
    hasAdmin: boolean;
  
    @HasMany(() => Employee)
    employee: Employee[];
  }
  