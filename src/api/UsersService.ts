import { ILogin, IRegister } from "@/interfaces/auth.interface";
import { IUser } from "@/interfaces/user.interface";

import api from "./api";

class Users {
  async getUser() {
    return await api.get("/profile");
  }

  async updateUser(data: IUser) {
    return await api.patch("/profile", data);
  }
}

const UsersService = new Users();
export default UsersService;
