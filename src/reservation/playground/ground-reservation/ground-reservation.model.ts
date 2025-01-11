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
import { User } from '../../../user/user.model';
import { Sabha } from '../../../sabha/sabha.model';
import { Ground } from '../ground/ground.model';

@Table({ tableName: 'groundReservation', timestamps: false })
export class GroundReservation extends Model<GroundReservation> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  groundReservationId: number;

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
    allowNull: false,
  })
  event: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;


  // @ForeignKey(() => Sabha)
  // @Column({
  //   type: DataType.INTEGER,
  //   allowNull: false,
  // })
  // sabhaId: number;

  // @BelongsTo(() => Sabha)
  // sabha: Sabha;

  @ForeignKey(() => Ground)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  groundId: number;

  @BelongsTo(() => Ground)
  ground: Ground;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  reservationDate: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  payment: number;

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
  status: number; // 0 - Booked, 1 - Cancelled

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
}
