import { Grid, Card, CardMedia, CardContent, CardHeader } from "@mui/material";
import { useQuery } from "react-query";

interface IRecipe {
  title: string;
  image: string;
}

const RecipesList = () => {
  const { isLoading, error, data } = useQuery<{ recipes: IRecipe[] }, Error>(
    "RecipesListRandom",
    () =>
      fetch("http://localhost:3000/api/recipes/random").then((res) =>
        res.json()
      )
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <Grid container spacing={3}> 
      {data?.recipes?.map((recipe) => (
        <Grid item xs={12} md={3} justifyContent="center">
          <Card key={recipe.title}>
            <CardHeader title={recipe.title}></CardHeader>
            <CardMedia
              component="img"
              height="180"
              image={recipe.image}
              alt={recipe.title}
            ></CardMedia>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipesList;
