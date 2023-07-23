import dotenv from "dotenv";
dotenv.config();

import { createContainer, asClass, Lifetime } from "awilix";

import UserMongooseRepository from "../data/mongoose/repositories/userMongooseDao.js";
import RoleMongooseRepository from "../data/mongoose/repositories/roleMongooseDao.js";
import CartMongooseRepository from "../data/mongoose/repositories/cartMongooseDao.js";
import ProductMongooseRepository from "../data/mongoose/repositories/productMongooseDao.js";
import TicketMongooseRepository from "../data/mongoose/repositories/ticketMongooseDao.js";

const container = createContainer();

if (process.env.DB === "MongooseAdapter") {
  container.register("UserRepository", asClass(UserMongooseRepository), {
    lifetime: Lifetime.SINGLETON,
  });
  container.register("RoleRepository", asClass(RoleMongooseRepository), {
    lifetime: Lifetime.SINGLETON,
  });
  container.register("CartRepository", asClass(CartMongooseRepository), {
    lifetime: Lifetime.SINGLETON,
  });
  container.register("ProductRepository", asClass(ProductMongooseRepository), {
    lifetime: Lifetime.SINGLETON,
  });
  container.register("TicketRepository", asClass(TicketMongooseRepository), {
    lifetime: Lifetime.SINGLETON,
  });
}

export default container;
