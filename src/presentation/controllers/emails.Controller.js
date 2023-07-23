import EmailManager from "../../domain/managers/emails.js";
import SessionManager from "../../domain/managers/sessions.js";
import UserManager from "../../domain/managers/users.js";
import { createHash } from "../../shared/index.js";

export const forgotPassword = async (req, res, next) => {
  try {
    const email = req.body.email;

    const emailManager = new EmailManager();
    await emailManager.send("forgotPassword.handlebars", email);
    console.log("mail enviado");

    res.send({ status: "success" });
  } catch (e) {
    next(e);
  }
};

export const formChangePassword = async (req, res, next) => {
  res.render("formChangePassword", {});
};

export const validationPassword = async (req, res, next) => {
  try {
    const { password, password2 } = req.body;

    const sessionManager = new SessionManager();
    await sessionManager.validation(password, password2);

    const email = req.user.email;

    const userManager = new UserManager();
    const user = await userManager.getOneByEmail(email);

    const passwordHashed = await createHash(password);
    await userManager.updateOne(user.id, { password: passwordHashed });

    res.send({ status: "success" });
  } catch (e) {
    next(e);
  }
};
