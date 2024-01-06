import { ChangeEvent, FC, useState } from "react";
import RecipesAPI from "../../api/Recipes";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { IMyRecipe } from "../../interfaces/Recipe";

interface IProps {
  recipeToUpdate?: IMyRecipe;
  handleFinishedSave: (isSuccess: boolean, message: string) => void;
}

const AddAndEditRecipe: FC<IProps> = ({
  recipeToUpdate,
  handleFinishedSave,
}) => {
  const [myRecipe, setMyRecipe] = useState<IMyRecipe | undefined>(
    recipeToUpdate
  );

  const changeMyRecipe = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMyRecipe((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (myRecipe) {
      try {
        await RecipesAPI.createNewRecipe(myRecipe!);
      } catch (e: any) {
        handleFinishedSave(false, e.message);
      }

      handleFinishedSave(true, "data saved successfully!");
    }
  };

  return (
    <Grid container justifyContent="center" rowGap={5}>
      <Grid item xs={10}>
        <Typography variant="h6" textAlign="center">
          {recipeToUpdate?._id ? `Update Recipe: ${recipeToUpdate.title}` : `Create new Recipe`}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            value={myRecipe?.title}
            onChange={changeMyRecipe}
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoFocus
          />
          <TextField
            value={myRecipe?.instructions}
            onChange={changeMyRecipe}
            margin="normal"
            required
            fullWidth
            name="instructions"
            label="Instructions"
            id="instructions"
            autoComplete="instructions"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddAndEditRecipe;
