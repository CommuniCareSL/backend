import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'holiday', timestamps: false })
export class Holiday extends Model<Holiday> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  holidayId: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  holidayDate: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  reason: string;

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
