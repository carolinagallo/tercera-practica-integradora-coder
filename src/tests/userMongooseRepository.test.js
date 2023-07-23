import dotenv from "dotenv";
dotenv.config();

import { faker } from "@faker-js/faker";
import DbFactory from "../data/factories/dbFactory.js";
import chai from "chai";

const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

import UserMongooseRepository from "../data/mongoose/repositories/userMongooseDao.js";

describe("Testing User Mongoose Repository", () => {
  before(function () {
    db.init(process.env.DB_URI);
    this.userRepository = new UserMongooseRepository();
  });
  after(function () {
    db.close();
  });
  beforeEach(function () {
    this.timeout(5000);
  });

  it("El repositorio debe ser una instancia de UserMongooseRepository", function () {
    expect(this.userRepository instanceof UserMongooseRepository).to.be.ok;
  });

  it("El repositorio debe devolver un arreglo", function () {
    return this.userRepository
      .paginate({ limit: 5, page: 1 })
      .then((result) => {
        expect(Array.isArray(result.users)).to.be.equals(true);
        expect(result.pagination.limit).to.be.equals(5);
        expect(result.users).to.be.an("array");
      });
  });

  it("El repositorio debe poder crear un user", function () {
    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      age: 18,
      isAdmin: false,
      password: 12345678,
    };

    return this.userRepository.create(user).then((result) => {
      expect(result.firstName).to.be.equals(user.firstName);
      expect(result.email).to.be.equals(user.email);
    });
  });

  it("El repositorio debe poder traer un user", function () {
    return this.userRepository
      .getOne("64a330c8fe3718a5ac191733")
      .then((result) => {
        expect(result).to.be.an("object");
      });
  });

  it("El repositorio debe poder actualizar un user", function () {
    const user = {
      email: faker.internet.email(),
      age: 18,
    };

    return this.userRepository
      .updateOne("64a330c8fe3718a5ac191733", user)
      .then((result) => {
        expect(result.age).to.be.equals(user.age);
        expect(result.email).to.be.equals(user.email);
      });
  });

  it("El repositorio debe poder eliminar un user", function () {
    return this.userRepository
      .deleteOne("64a330c8fe3718a5ac191733")
      .then((result) => {
        expect(result).to.be.an("object");
      });
  });
});
