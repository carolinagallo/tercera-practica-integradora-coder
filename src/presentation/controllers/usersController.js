import UserManager from "../../domain/managers/users.js";
import userUpdateValidation from "../../domain/validations/user/userUpdateValidations.js";
import userCreateValidation from "../../domain/validations/user/userCreateValidations.js";
import { createHash } from "../../shared/index.js";

export const list =
  ("/",
  async (req, res, next) => {
    try {
      const { limit, page } = req.query;

      const userManager = new UserManager();

      const users = await userManager.paginate({ limit, page });

      res.send({
        status: "success",
        users: users.docs,
        ...users,
        docs: undefined,
      });
    } catch (e) {
      next(e);
    }
  });

export const getOne =
  ("/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const userManager = new UserManager();

      const user = await userManager.getOne(id);

      res.send({ status: "success", user });
    } catch (e) {
      next(e);
    }
  });

export const save =
  ("/",
  async (req, res, next) => {
    try {
      const data = {
        ...req.body,
        password: await createHash(req.body.password, 10),
      };

      await userCreateValidation.parseAsync(data);
      const userManager = new UserManager();

      const user = await userManager.create(data);

      res.send({ status: "success", user, massage: "user created" });
    } catch (e) {
      next(e);
    }
  });

export const update =
  ("/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;

      await userUpdateValidation.parseAsync(data);

      const userManager = new UserManager();
      console.log(data);
      const user = await userManager.updateOne(id, data);

      res.send({ status: "success", user, massage: "user updated" });
    } catch (e) {
      next(e);
    }
  });

export const deleteOne =
  ("/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const userManager = new UserManager();

      await userManager.deleteOne(id);

      res.send({ status: "success", massage: "user deleted" });
    } catch (e) {
      next(e);
    }
  });
