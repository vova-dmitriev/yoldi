import { ILogin, IRegister } from "@/interfaces/auth.interface";

import api from "./api";

class Auth {
  async signUp(data: IRegister) {
    return await api.post("/auth/sign-up", data);
  }

  async login(data: ILogin) {
    return await api.post("/auth/login", data);
  }
}

const AuthService = new Auth();
export default AuthService;
