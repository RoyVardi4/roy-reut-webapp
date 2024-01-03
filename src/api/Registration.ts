import axios from "axios";
import { IUser } from "../interfaces/User";

class RegistrationAPI {
  static registerUser = async (user: IUser) => {
    return axios
      .post("auth/register",  {
        user
      })
      .then((res) => console.log(res.data));
  };
}

export default RegistrationAPI;
