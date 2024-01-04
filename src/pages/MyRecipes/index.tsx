import { Card, CardHeader, Grid, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { IRecipe } from "../../interfaces/Recipe";
import RecipesAPI from "../../api/Recipes";
import RecipeSkeleton from "../../components/RecipeItem/Skeleton";

const MyRecipes = () => {
  const { isLoading, error, data } = useQuery<IRecipe[], Error>(
    ["MyRecipes"],
    () => RecipesAPI.getMyRecipe()
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
    <Grid container justifyContent="center" rowGap={5}>
      <Grid item xs={10}>
        <Typography variant="h6" textAlign="center">
          My Recipes:
        </Typography>
      </Grid>
      <Grid container item xs={10} spacing={3}>
        {data?.map((recipe) => (
          <Grid item xs={12} md={3}>
            <Card>
              <CardHeader
                title={recipe.title}
                subheader={recipe.instructions}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default MyRecipes;
