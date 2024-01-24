import axios from "axios";
import { IUser } from "../interfaces/User";

class UserAPI {
  static getUserInfo = async () => {
    return axios.get("users/myInfo").then((res) => res.data);
  };

  static addImage = async (file: File, userEmail: string) => {
    let formData = new FormData();
    formData.append("profilePicture", file);

    return axios
      .post(`users/myPhoto/${userEmail}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data as IUser);
  };
}

export default UserAPI;
