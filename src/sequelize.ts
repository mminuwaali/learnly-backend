import "dotenv/config";
import account from "./modules/account";
import product from "./modules/product";
import { Sequelize } from 'sequelize-typescript';

const instance = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
    models:Array.prototype.concat(account.models, product.models),
});

export default instance;
