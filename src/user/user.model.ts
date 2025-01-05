import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Sabha } from '../sabha/sabha.model'; // Import Sabha entity

@Table({
  tableName: 'user',  
  timestamps: false,
})
export class User extends Model<User> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  userId: number;

  @Column({
    type: DataType.STRING,
  })
  fullName: string;

  @Column({
    type: DataType.STRING,
  })
  idNumber: string;

  @Column({
    type: DataType.STRING,
  })
  phoneNumber: string;

  @Column({
    type: DataType.STRING,
  })
  district: string;

  @ForeignKey(() => Sabha)
  @Column({
    type: DataType.INTEGER,
    field: 'sabhaId',
  })
  sabhaId: number;

  @BelongsTo(() => Sabha)
  sabha: Sabha;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'user',
  })
  role: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
  })
  isBlock: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
  })
  isDelete: number;
}

