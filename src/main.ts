import "dotenv/config";
import sequelize from "./sequelize";
import account from "./modules/account";
import product from "./modules/product";
import express, { NextFunction, Response } from "express";
import { jwtMiddleware } from "./middlewares/token.midleware";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(errorMiddleware);
app.use<any>(jwtMiddleware);

app.use((_, res: Response, next: NextFunction): void => {
    res.header("Access-Control-Allow-Origin", `http://localhost:${port}`);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use("/api", account.routers, product.routers);


(async () => {
    await sequelize.sync();

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
        console.log('Press CTRL + C to cancel the server');
    });
})();