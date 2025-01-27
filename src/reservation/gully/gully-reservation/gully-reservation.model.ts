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
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from '../../../user/user.model';

@Table({ tableName: 'gullyReservation', timestamps: false })
export class GullyReservation extends Model<GullyReservation> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @Column(DataType.INTEGER)
  sabhaId: number;

  @BelongsTo(() => User)
  user: User;

  @Column(DataType.STRING)
  telephone: string;

  @Column(DataType.TEXT)
  location: string;

  @Column(DataType.INTEGER)
  frequency: number;

  @Column(DataType.FLOAT)
  totalPayment: number;

  @Default(0)
  @Column(DataType.INTEGER)
  status: number;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updatedAt: Date;

  @Column({
    type: DataType.DATEONLY, 
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  reservationDate: string; 
}
