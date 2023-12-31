import { FC, memo } from "react";
import { Grid } from "@mui/material";
import { useQuery } from "react-query";
import { IRecipe } from "../../interfaces/Recipe";
import RecipesItem from "../RecipeItem";
import RecipeSkeleton from "../RecipeItem/Skeleton";
import RecipesAPI from "../../api/Recipes";

interface IList {
  queryString: string;
}

const RecipesList: FC<IList> = ({ queryString }) => {
  const { isLoading, error, data } = useQuery<{ results: IRecipe[] }, Error>(
    ["RecipesListComplexSearch", queryString],
    () => RecipesAPI.getComplexQueryRecipes(queryString)
  );

  if (isLoading)
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((i) => (
          <Grid key={i} item xs={12} md={3} justifyContent="center">
            <RecipeSkeleton />
          </Grid>
        ))}
      </Grid>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <Grid container spacing={3}>
      {data?.results?.map((recipe) => (
        <RecipesItem recipe={recipe} key={recipe.id} />
      ))}
    </Grid>
  );
};

export default memo(RecipesList);
