import { encryptPassword } from '../../../utilities/bcrypt.util';
import { Table, Column, Model, PrimaryKey, BeforeCreate, AutoIncrement } from 'sequelize-typescript';

@Table
export default class User extends Model<User> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @Column
    password!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ unique: true })
    username!: string;

    @BeforeCreate
    static async hashPassword(instance: User) {
        instance.password = await encryptPassword(instance.password);
    }

    public toJSON() {
        const { password, ...rest } = this.get()
        return rest;
    }
}