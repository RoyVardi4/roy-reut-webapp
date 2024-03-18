import {
  Alert,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  Fab,
  FormControlLabel,
  Grid,
  IconButton,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "react-query";
import { useUser } from "../../context/user";
import { IMyRecipe } from "../../interfaces/Recipe";
import RecipesAPI from "../../api/Recipes";
import RecipeSkeleton from "../../components/RecipeItem/Skeleton";
import AddAndEditRecipe from "./AddAndEditRecipe";
import { SetStateAction, useState } from "react";
import AddImageToRecipe from "./AddImage";
import { Add, CameraAlt, Delete, Edit } from "@mui/icons-material";
import Slide from "@mui/material/Slide";
import Comments from "./Comments";

function TransitionLeft(props: any) {
  return <Slide {...props} direction="left" />;
}

const MyRecipes = () => {
  const { user } = useUser();
  const { isLoading, error, data, refetch } = useQuery<IMyRecipe[], Error>(
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
  const [onlyMyRecipes, setOnlyMyRecipes] = useState(false);
  const [searchText, setSearchText] = useState("");

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

  const handleDeleteRecipe = async (recipeId: string) => {
    await RecipesAPI.deleteRecipe(recipeId);
    refetch();
    setIsSnackbarOpen(true);
    setSnackbarProps({
      isSuccess: true,
      message: "recipe deleted sccuessfully",
    });
  };

  if (isLoading)
    return (
      <Grid container justifyContent="center" rowGap={5}>
        <Grid item xs={10}>
          <Typography variant="h6" textAlign="center">
            All Users Recipes:
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

  const filteredRecipes = () => {
    return data?.filter((recipe) => {
      if (
        recipe.title?.toLowerCase().includes(searchText.toLowerCase()) ||
        recipe.instructions?.toLowerCase().includes(searchText.toLowerCase())
      ) {
        if (onlyMyRecipes) {
          return recipe.author?.email === user?.email;
        } else {
          return true;
        }
      } else {
        return false
      }
    });
  };

  return (
    <Grid container justifyContent="center" rowGap={5}>
      <Grid item xs={10}>
        <Typography variant="h6" textAlign="center">
          All Users Recipes
        </Typography>
        <FormControlLabel
          control={
            <Switch
              onChange={() => setOnlyMyRecipes((prev) => !prev)}
              value={onlyMyRecipes}
            />
          }
          label="Only My Recipes"
        />
        <TextField
          margin="normal"
          fullWidth
          label="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Grid>
      <Grid container item xs={10} spacing={3}>
        {filteredRecipes()?.map((recipe) => (
          <Grid key={recipe._id} item xs={12} md={3}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar
                    src={
                      recipe.author?.email &&
                      `${
                        import.meta.env.VITE_SERVER_URL ||
                        "http://localhost:3000/api/"
                      }users/myPhoto/${
                        recipe.author?.email
                      }?${new Date().getTime()}`
                    }
                    onError={handleImageError}
                    aria-label="recipe"
                  ></Avatar>
                }
                title={recipe.title}
                subheader={recipe.author?.email}
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
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {recipe.instructions}
                </Typography>
              </CardContent>
              {recipe.author?.email === user?.email && (
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
                  <IconButton onClick={() => handleDeleteRecipe(recipe._id!)}>
                    <Delete />
                  </IconButton>
                </CardActions>
              )}
            </Card>
            <Comments recipeId={recipe._id!} />
          </Grid>
        ))}
      </Grid>
      <Fab
        sx={{
          margin: 0,
          top: "auto",
          left: "auto",
          bottom: 60,
          right: 60,
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
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
