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
import { Sabha } from '../../../sabha/sabha.model';

@Table({
  tableName: 'ground',
  timestamps: false,
})
export class Ground extends Model<Ground> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  groundId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => Sabha)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  sabhaId: number;

  @BelongsTo(() => Sabha)
  sabha: Sabha;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  area: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  terms: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  pricePerDay: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  note: string;

  @Column({
    type: DataType.BOOLEAN,      
    allowNull: false,
    defaultValue: false,
  })
  isDeleted: boolean; 

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;
}
