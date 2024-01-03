import axios from "axios";
import { IUser } from "../interfaces/User";

class LoginAPI {
  static userLogin = async (user: IUser) => {
    return axios
      .post("auth/login",  {
        user
      })
      .then((res) => {
        user.accessToken = res.data.accessToken
        user.refreshToken = res.data.refreshToken
      });
  };
}

export default LoginAPI;
