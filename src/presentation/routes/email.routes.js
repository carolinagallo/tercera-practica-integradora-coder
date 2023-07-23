import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  forgotPassword,
  formChangePassword,
  validationPassword,
} from "../controllers/emails.Controller.js";

const emailRouter = Router();

emailRouter.get("/forgotPassword", forgotPassword);
emailRouter.get("/formChangePassword", formChangePassword);
emailRouter.post("/validationPassword", auth, validationPassword);

export default emailRouter;
