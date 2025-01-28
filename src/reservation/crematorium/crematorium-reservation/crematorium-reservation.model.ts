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
} from 'sequelize-typescript';
import { User } from '../../../user/user.model';
import { Crematorium } from '../crematorium/crematorium.model';

@Table({ tableName: 'crematoriumReservation', timestamps: true }) // Enable timestamps
export class CrematoriumReservation extends Model<CrematoriumReservation> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  reservationId: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Crematorium)
  @Column(DataType.INTEGER)
  crematoriumId: number;

  @BelongsTo(() => Crematorium)
  crematorium: Crematorium;

  @Column(DataType.STRING)
  deceasedName: string;

  @Column(DataType.STRING)
  deceasedAddress: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  dateOfDeath: Date;

  @Column(DataType.STRING)
  notifierName: string;

  @Column(DataType.STRING)
  notifierAddress: string;

  @Column(DataType.STRING)
  relationship: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  funeralDate: Date;

  @Column(DataType.STRING)
  timeSlot: string;

  @Column(DataType.INTEGER)
  payment: number;

  @Default(0)
  @Column(DataType.INTEGER)
  status: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  reservationDate: string;

}