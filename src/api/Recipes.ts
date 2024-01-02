import axios from "axios";

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

  static getRecipeInformationById = async (id: number) => {
    return axios
      .get(`recipes/${id}/information`)
      .then((res) => res.data);
  };
}

export default RecipesAPI;
