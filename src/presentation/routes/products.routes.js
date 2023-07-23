import { Router } from "express";
import { uploader } from "../middlewares/multer.js";

import {
  getAllProducts,
  getOneById,
  uploaderProduct,
  updateOneProduct,
  deleteById,
} from "../controllers/productsController.js";
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:pid", getOneById);
router.post(
  "/add",
  uploader.single("thumbnail"),
  auth,
  authorization(),
  uploaderProduct
);
router.put("/update/:pid", auth, authorization(), updateOneProduct);
router.delete("/delete/:pid", auth, authorization(), deleteById);

export default router;
