import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import { Department } from '../../department/department.model'; // Adjust the path accordingly
  
  @Table({
    tableName: 'reservationCategory',
    timestamps: false, 
  })
  export class ReservationCategory extends Model<ReservationCategory> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    reservationCategoryId: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    name: string;
  
    @ForeignKey(() => Department)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    departmentId: number;
  
    @BelongsTo(() => Department)
    department: Department;
  }