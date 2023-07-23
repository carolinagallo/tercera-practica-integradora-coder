import userCreateValidation from "../validations/user/userCreateValidations.js";
import userUpdateValidation from "../validations/user/userUpdateValidations.js";
import idValidation from "../validations/shared/idValidation.js";
import { createHash } from "../../shared/index.js";
import container from "../../shared/container.js";

class UserManager {
  constructor() {
    this.userRepository = container.resolve("UserRepository");
  }

  async paginate(criteria) {
    return this.userRepository.paginate(criteria);
  }

  async getOne(id) {
    await idValidation.parseAsync({ id });
    return this.userRepository.getOne(id);
  }
  async create(data) {
    await userCreateValidation.parseAsync(data);
    const dto = {
      ...data,
      password: await createHash(data.password, 10),
    };
    const user = await this.userRepository.create(dto);

    return { ...user, password: undefined };
  }

  async updateOne(id, data) {
    await userUpdateValidation.parseAsync({ ...data, id });
    return this.userRepository.updateOne(id, data);
  }

  async deleteOne(id) {
    return await this.userRepository.deleteOne(id);
  }

  async getOneByEmail(email) {
    return this.userRepository.getOneByEmail(email);
  }
}

export default UserManager;
