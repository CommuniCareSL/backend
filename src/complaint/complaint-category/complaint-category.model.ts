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
    tableName: 'complaintCategory',
    timestamps: false, // Add this if you don't use createdAt/updatedAt
  })
  export class ComplaintCategory extends Model<ComplaintCategory> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    complaintCategoryId: number;
  
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