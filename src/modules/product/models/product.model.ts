import User from '../../account/models/user.model';
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table
export default class Product extends Model<Product> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @BelongsTo(() => User)
    createdBy: User;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    createdById: number;

    @Column(DataType.FLOAT)
    price: number;

    @Column(DataType.STRING)
    name: string;

    @Column(DataType.STRING)
    description: string;

    @Column(DataType.STRING)
    image: string;
}
