import axios from "axios";
import { IMyRecipe } from "../interfaces/Recipe";

class RecipesAPI {
  static getComplexQueryRecipes = async (queryString: string) => {
    return axios
      .get("recipes/complexSearch", {
        params: {
          queryString: queryString,
        },
      })
      .then((res) => res.data);
  };
  static getUserImageRecipe = async (recipeId: string) => {
    return axios.get(`recipes/img/${recipeId}`).then((res) => res.data);
  };

  static getRecipeInformationById = async (id: number) => {
    return axios.get(`recipes/${id}/information`).then((res) => res.data);
  };

  static getUsersRecipe = async () => {
    return axios.get(`recipes/users`).then((res) => res.data);
  };

  static getUserRecipeComments = async (recipeId: string) => {
    return axios.get(`recipes/users/${recipeId}`).then((res) => res.data);
  };

  static addImageToRecipe = async (file: File, recipeId: string) => {
    let formData = new FormData();
    formData.append("recipeImage", file);

    return axios
      .post(`recipes/img/${recipeId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data as IMyRecipe);
  };

  static createNewRecipe = async (recipe: IMyRecipe) => {
    return axios
      .post("recipes/", {
        recipe: recipe,
      })
      .then((res) => res.data as IMyRecipe);
  };

  static postComment = async (
    recipeId: string,
    payload: {desc: string}
  ): Promise<IMyRecipe> => {
    return axios
      .post("recipes/users/comments", {
        comment: {
          recipeId: recipeId,
          payload: payload,
        },
      })
      .then((res) => res.data);
  };
}

export default RecipesAPI;
