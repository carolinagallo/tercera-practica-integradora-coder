import dotenv from "dotenv";
dotenv.config();

import { faker } from "@faker-js/faker";
import DbFactory from "../data/factories/dbFactory.js";
import chai from "chai";

const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

import RoleMongooseRepository from "../data/mongoose/repositories/roleMongooseDao.js";

describe("Testing User Mongoose Repository", () => {
  before(function () {
    db.init(process.env.DB_URI);
    this.roleRepository = new RoleMongooseRepository();
  });
  after(function () {
    db.close();
  });
  beforeEach(function () {
    this.timeout(5000);
  });

  it("El repositorio debe ser una instancia de UserMongooseRepository", function () {
    expect(this.roleRepository instanceof RoleMongooseRepository).to.be.ok;
  });

  it("El repositorio debe devolver un arreglo", function () {
    return this.roleRepository
      .paginate({ limit: 1, page: 1 })
      .then((result) => {
        expect(Array.isArray(result.roles)).to.be.equals(true);
        expect(result.pagination.limit).to.be.equals(1);
        expect(result.roles).to.be.an("array");
      });
  });

  it("El repositorio debe poder crear un role", function () {
    const role = {
      name: faker.person.firstName(),
      permissions: ["getOne", "updateOne"],
    };

    return this.roleRepository.create(role).then((result) => {
      expect(result.name).to.be.equals(role.name);
      expect(result.permissions).to.be.an("array");
    });
  });

  it("El repositorio debe poder traer un role", function () {
    return this.roleRepository
      .getOne("6477bdc5bf7bff413f8d2df2")
      .then((result) => {
        expect(result).to.be.an("object");
      });
  });

  it("El repositorio debe poder actualizar un role", function () {
    const role = {
      permissions: ["create"],
    };

    return this.roleRepository
      .updateOne("64a349257ce9fad8f8c11e86", role)
      .then((result) => {
        console.log(result);
        expect(result.permissions).to.deep.equals(role.permissions);
      });
  });

  it("El repositorio debe poder eliminar un role", function () {
    return this.roleRepository
      .deleteOne("6477bde7804f897aa5ea9a3e")
      .then((result) => {
        expect(result).to.be.an("object");
      });
  });
});
