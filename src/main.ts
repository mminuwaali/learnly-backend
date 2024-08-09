import "dotenv/config";
import cors from "cors";
import path from 'path';
import express from "express";
import sequelize from "./sequelize";
import account from "./modules/account";
import product from "./modules/product";
import { jwtMiddleware } from "./middlewares/token.midleware";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(errorMiddleware);
app.use<any>(jwtMiddleware);
app.use('/media', express.static(path.join(__dirname, '../media')));

app.use(express.urlencoded({ extended: true }));
app.use("/api", account.routers, product.routers);


(async () => {
    await sequelize.sync();

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
        console.log('Press CTRL + C to cancel the server');
    });
})();