import Product from "../models/product.model";
import { Request, Response, NextFunction } from "express";

export async function getProductsController(request: Request, response: Response, next: NextFunction) {
    console.log(request.body, request.query);

    try {
        const limit = parseInt(request.query.limit as string) || 100;
        const page = parseInt(request.query.page as string) || 1;

        const offset = (page - 1) * limit;
        const products = await Product.findAll({ limit, offset });

        response.status(200).json({ products, page, limit });
    } catch (error) {
        next(error);
    }
};
export async function getMyProductsController(request: any | Request, response: Response, next: NextFunction) {
    try {
        const limit = parseInt(request.query.limit as string) || 100;
        const page = parseInt(request.query.page as string) || 1;

        const offset = (page - 1) * limit;
        const products = await Product.findAll({ limit, offset, where: { createdById: request.user.id } });

        response.status(200).json({ products, page, limit });
    } catch (error) {
        next(error);
    }
};

export async function createProductController(request: any | Request, response: Response, next: NextFunction) {
    try {
        const { name, description, price, image } = request.body as any;
        console.log(request.body);

        const newProduct = await Product.create({ name, description, price, image, createdById: request.user.id });
        response.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
};

export async function updateProductController(request: any | Request, response: Response, next: NextFunction) {
    try {
        const { id } = request.params;
        const { name, description, price, image: newImage } = request.body as any;

        const product = await Product.findByPk(id);
        const image = newImage || product.image;
        if (!product) return response.status(404).json({ message: "Product not found" });

        await product.update({ name, description, price, image });
        response.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

export async function getSingleProductsController(request: Request, response: Response, next: NextFunction) {
    try {
        const { id } = request.params;
        const product = await Product.findByPk(id);

        if (!product) return response.status(404).json({ message: "Product not found" });
        response.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

export default {
    getProductsController,
    getMyProductsController,
    createProductController,
    updateProductController,
    getSingleProductsController,
};