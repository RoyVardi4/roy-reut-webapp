import axios from "axios";

class RecipesAPI {
  static getComplexQueryRecipes = async (queryString: string) => {
    return axios
      .get("http://localhost:3000/api/recipes/complexSearch", {
        params: {
          queryString: queryString,
        },
      })
      .then((res) => res.data);
  };

  static getRecipeInformationById = async (id: number) => {
    return axios
      .get(`http://localhost:3000/api/recipes/${id}/information`)
      .then((res) => res.data);
  };
}

export default RecipesAPI;
