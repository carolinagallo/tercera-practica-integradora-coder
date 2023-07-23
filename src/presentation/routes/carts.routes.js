import { Router } from "express";
import {
  createCart,
  findCartById,
  updateCart,
  deleteProduct,
  deleteProducts,
  updateAllProducts,
  updateQuantity,
  purchase,
} from "../controllers/cartsController.js";
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";

const router = Router();

router.post("/", createCart);
router.get("/:cid", findCartById);
router.post(
  "/:cid/product/:pid",
  auth,
  authorization("addProduct"),
  updateCart
);
router.delete("/:cid/product/:pid", auth, deleteProduct);
router.delete("/:cid", auth, deleteProducts);
router.put("/:cid", auth, updateAllProducts);
router.put("/:cid/product/:pid", auth, updateQuantity);
router.post("/:cid/purchase", auth, purchase);

export default router;
