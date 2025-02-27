import { ILogin, IRegister } from "@/interfaces/auth.interface";
import { IUser, IUserNewData } from "@/interfaces/user.interface";

import api from "./api";

class Users {
  async getProfile() {
    return await api.get("/profile");
  }

  async getUsers() {
    return await api.get("/user");
  }

  async getUserBySlug(slug: string) {
    return await api.get(`/user/${slug}`);
  }

  async updateUser(data: IUserNewData) {
    return await api.patch("/profile", data);
  }

  async uploadFile(data: FormData) {
    return await api.post("/image", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

const UsersService = new Users();
export default UsersService;
