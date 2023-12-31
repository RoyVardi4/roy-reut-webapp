import { Grid } from "@mui/material";
import { useQuery } from "react-query";
import { IRecipe } from "../../interfaces/Recipe";
import RecipesItem from "../RecipeItem";
import axios from "axios";
import { FC } from "react";

interface IList {
  queryString: string;
}

const RecipesList: FC<IList> = ({ queryString }) => {
  const { isLoading, error, data } = useQuery<{ results: IRecipe[] }, Error>(
    ["RecipesListRandom", queryString],
    () =>
      axios
        .get("http://localhost:3000/api/recipes/complexSearch", {
          params: {
            queryString: queryString,
          },
        })
        .then((res) => res.data)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <Grid container spacing={3}>
      {data?.results?.map((recipe) => (
        <RecipesItem recipe={recipe} key={recipe.id} />
      ))}
    </Grid>
  );
};

export default RecipesList;
