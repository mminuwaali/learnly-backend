import { Router } from "express";
import ProductModel from "./models/product.model";
import productRoute from "./routes/product.route";

export const routers = Router();
export const models = [ProductModel];

routers.use("/product", productRoute);

export default { models, routers };
