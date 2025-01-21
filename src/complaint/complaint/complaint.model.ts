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
import { ComplaintCategory } from '../complaint-category/complaint-category.model';

@Table({
  tableName: 'complaint',
  timestamps: false, // Add this if you don't use createdAt/updatedAt
})
export class Complaint extends Model<Complaint> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  complaintId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Sabha)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  sabhaId: number;

  @BelongsTo(() => Sabha)
  sabha: Sabha;

  @ForeignKey(() => ComplaintCategory)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId: number;

  @BelongsTo(() => ComplaintCategory)
  complaintCategory: ComplaintCategory;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  location: string; // latitude,longitude

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  remark: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  area: string;

  @Default(0)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  status: number; // 0 - Pending, 1 - In Progress, 2 - Resolved, 3 - Rejected

  // @Column({
  //   type: DataType.TEXT,
  //   allowNull: true,
  // })
  // proofs: string; // Binary data (e.g., image)
  @Column({
    type: DataType.JSONB, // Using JSONB to store Base64 images with metadata
    allowNull: true,
  })
  proofs: any;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  note: string;

  @UpdatedAt
  @Column({
    type: DataType.DATE, // This stores both the date and time
    allowNull: true,
  })
  updatedAt: Date;
}
