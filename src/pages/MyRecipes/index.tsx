import {
  Alert,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Dialog,
  Fab,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { useQuery } from "react-query";
import { IMyRecipe } from "../../interfaces/Recipe";
import RecipesAPI from "../../api/Recipes";
import RecipeSkeleton from "../../components/RecipeItem/Skeleton";
import AddAndEditRecipe from "./AddAndEditRecipe";
import { SetStateAction, useState } from "react";
import AddImageToRecipe from "./AddImage";
import { Add, CameraAlt, Edit } from "@mui/icons-material";
import Slide from "@mui/material/Slide";

function TransitionLeft(props: any) {
  return <Slide {...props} direction="left" />;
}

const MyRecipes = () => {
  const { isLoading, error, data, refetch} = useQuery<IMyRecipe[], Error>(
    ["UserRecipes"],
    () => RecipesAPI.getUsersRecipe(),
    {
      refetchOnWindowFocus: true,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 0,
    }
  );

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [sackbarProps, setSnackbarProps] = useState<{
    isSuccess: boolean;
    message: string;
  }>();
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [editRecipe, setEditRecipe] = useState<IMyRecipe | undefined>();

  const changeDialogState = (
    recipe: IMyRecipe | undefined,
    setFunction: (value: SetStateAction<boolean>) => void
  ) => {
    setEditRecipe(recipe);
    setFunction((prev) => !prev);
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const handleFinishedSave = (isSuccess: boolean, message: string) => {
    setIsDetailsDialogOpen(false);
    setIsImageDialogOpen(false);
    refetch();
    setIsSnackbarOpen(true);
    setSnackbarProps({
      isSuccess: isSuccess,
      message: message,
    });
  };

  const handleImageError = (e: any) => {
    e.target.onerror = null;
    e.target.src =
      "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg";
  };

  if (isLoading)
    return (
      <Grid container justifyContent="center" rowGap={5}>
        <Grid item xs={10}>
          <Typography variant="h6" textAlign="center">
            My Recipes:
          </Typography>
        </Grid>
        <Grid item xs={10}>
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
              {recipe.file ? (
                <CardMedia
                  component="img"
                  height="194"
                  image={`${
                    import.meta.env.VITE_SERVER_URL ||
                    "http://localhost:3000/api/"
                  }recipes/img/${recipe._id}?${new Date().getTime()}`}
                  onError={handleImageError}
                  alt={recipe.title}
                />
              ) : (
                <CardMedia
                  component="img"
                  height="194"
                  image="https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
                  onError={handleImageError}
                  alt={recipe.title}
                />
              )}
              <CardActions>
                <IconButton
                  onClick={() =>
                    changeDialogState(recipe, setIsDetailsDialogOpen)
                  }
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() =>
                    changeDialogState(recipe, setIsImageDialogOpen)
                  }
                >
                  <CameraAlt />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Fab
        sx={{
          margin: 0,
          top: "auto",
          left: 60,
          bottom: 60,
          right: "auto",
          position: "fixed",
        }}
        variant="extended"
        color="primary"
        onClick={() => changeDialogState(undefined, setIsDetailsDialogOpen)}
      >
        <Add sx={{ mr: 1 }} />
        Add Recipe
      </Fab>
      <Dialog
        open={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
      >
        <AddAndEditRecipe
          recipeToUpdate={editRecipe}
          handleFinishedSave={handleFinishedSave}
        />
      </Dialog>
      <Dialog
        open={isImageDialogOpen}
        onClose={() => setIsImageDialogOpen(false)}
      >
        <AddImageToRecipe
          recipeToUpdateId={editRecipe?._id!}
          recipeToUpdateName={editRecipe?.title!}
          handleFinishedSave={handleFinishedSave}
        />
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={TransitionLeft}
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {sackbarProps?.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default MyRecipes;
