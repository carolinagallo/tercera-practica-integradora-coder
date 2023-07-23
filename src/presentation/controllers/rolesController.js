import RoleManager from "../../domain/managers/roles.js";
import roleCreateValidation from "../../domain/validations/role/roleCreateValidation.js";
import roleUpdateValidation from "../../domain/validations/role/roleUpdateValidation.js";

export const list =
  ("/",
  async (req, res, next) => {
    try {
      const { limit, page } = req.query;

      const manager = new RoleManager();

      const roles = await manager.paginate({ limit, page });

      console.log(roles);

      res.send({
        status: "success",
        roles: roles.docs,
        ...roles,
        docs: undefined,
      });
    } catch (e) {
      next(e);
    }
  });

export const save =
  ("/",
  async (req, res, next) => {
    try {
      const data = req.body;

      await roleCreateValidation.parseAsync(data);

      const manager = new RoleManager();

      const role = await manager.create(data);

      res.send({ status: "success", role, message: "Role created." });
    } catch (e) {
      next(e);
    }
  });

export const getOne =
  ("/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const manager = new RoleManager();
      const role = await manager.getOne(id);

      res.send({ status: "success", role });
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

      await roleCreateValidation.parseAsync(data, id);

      const manager = new RoleManager();
      const result = await manager.updateOne(id, data);

      res.send({ status: "success", result, message: "Role updated." });
    } catch (e) {
      next(e);
    }
  });

export const deleteOne =
  ("/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const manager = new RoleManager();
      await manager.deleteOne(id);

      res.send({ status: "success", message: "Role deleted." });
    } catch (e) {
      next(e);
    }
  });
