import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Dialog,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { useQuery } from "react-query";
import { IMyRecipe } from "../../interfaces/Recipe";
import RecipesAPI from "../../api/Recipes";
import RecipeSkeleton from "../../components/RecipeItem/Skeleton";
import AddAndEditRecipe from "./AddAndEditRecipe";
import { useState } from "react";

const MyRecipes = () => {
  const { isLoading, error, data } = useQuery<IMyRecipe[], Error>(
    ["UserRecipes"],
    () => RecipesAPI.getUsersRecipe()
  );

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [sackbarProps, setSnackbarProps] = useState<{
    isSuccess: boolean;
    message: string;
  }>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editRecipe, setEditRecipe] = useState<IMyRecipe>();

  const changeDialogState = (recipe: IMyRecipe) => {
    setEditRecipe(recipe);
    setIsDialogOpen((prev) => !prev);
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const handleFinishedSave = (isSuccess: boolean, message: string) => {
    setIsSnackbarOpen(true);
    setSnackbarProps({
      isSuccess: isSuccess,
      message: message,
    });
  };

  if (isLoading)
    return (
      <Grid container justifyContent="center" rowGap={5}>
        <Grid item xs={10}>
          <Typography variant="h6" textAlign="center">
            My Recipes:
          </Typography>
        </Grid>
        <Grid item xs={10} spacing={3}>
          {[1, 2, 3, 4].map((i) => (
            <Grid key={i} item xs={12} md={3} justifyContent="center">
              <RecipeSkeleton />
            </Grid>
          ))}
        </Grid>
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
          <Grid key={recipe._id} item xs={12} md={3}>
            <Card>
              <CardHeader
                title={recipe.title}
                subheader={recipe.instructions}
              />
              <CardActions>
                <Button onClick={() => changeDialogState(recipe)}>Edit</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <AddAndEditRecipe
          recipeToUpdate={editRecipe}
          handleFinishedSave={handleFinishedSave}
        />
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={isSnackbarOpen}
        onClose={handleCloseSnackbar}
        message={sackbarProps?.message}
        key={'sncakbar'}
      />
    </Grid>
  );
};

export default MyRecipes;
