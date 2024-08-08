import { Router } from "express";
import { requireAuth } from "../../../utilities/auth.util";
import { uploadHandler } from "../../../utilities/upload.util";
import productController from "../controllers/product.controller";

const router = Router();

router.get("", productController.getProductsController);
router.get("/:id/single", productController.getSingleProductsController);
router.get("/me", requireAuth, productController.getMyProductsController);
router.post("", requireAuth, uploadHandler("image"), productController.createProductController);
router.patch("/:id", requireAuth, uploadHandler("image", true), productController.updateProductController);

export default router;
