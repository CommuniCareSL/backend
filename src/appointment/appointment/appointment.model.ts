import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  Default,
  CreatedAt,
  IsDate,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from '../../user/user.model';
import { Sabha } from '../../sabha/sabha.model';
import { Department } from '../../department/department.model';

@Table({ tableName: 'appointment', timestamps: false })
export class Appointment extends Model<Appointment> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  appointmentId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  serviceId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @ForeignKey(() => Sabha)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  sabhaId: number;

  @BelongsTo(() => Sabha)
  sabha: Sabha;

  @ForeignKey(() => Department)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  departmentId: number;

  @BelongsTo(() => Department)
  department: Department;


  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  date: String;

  // @Column({
  //   type: DataType.TIME,
  //   allowNull: false,
  // })
  // startTime: string;
  
  // @Column({
  //   type: DataType.TIME,
  //   allowNull: false,
  // })
  // endTime: string;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  timeSlot: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  note: string;

  @Default(0)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  status: number; // 0 - Booked, 1 - Cancelled, 2 - Pending, 3 - Completed

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  bcNote: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  tcNote: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  ocNote: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  ucNote: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  msg: string;
}
