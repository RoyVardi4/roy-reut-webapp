import axios from "axios";
import { IUser } from "../interfaces/User";

class LoginAPI {
  static userLogin = async (user: IUser) => {
    return axios
      .post("auth/login",  {
        user
      })
      .then((res) => {
        localStorage.setItem('email', user.email);
        localStorage.setItem('password', user.password);
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
      });
  };
}

export default LoginAPI;
