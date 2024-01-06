import { ChangeEvent, FC, FormEvent, useState } from "react";
import RecipesAPI from "../../api/Recipes";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { AttachFile, Close } from "@mui/icons-material";
import { MuiFileInput } from "mui-file-input";
import { IMyRecipe } from "../../interfaces/Recipe";

interface IProps {
  recipeToUpdate?: IMyRecipe;
  handleFinishedSave: (isSuccess: boolean, message: string) => void
}

const AddAndEditRecipe: FC<IProps> = ({ recipeToUpdate, handleFinishedSave }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (myRecipe) {
      try {
        const justCreatedRecipe = await RecipesAPI.createNewRecipe(myRecipe!);

        selectedImage &&
          justCreatedRecipe._id &&
          (await RecipesAPI.addImageToRecipe(
            selectedImage,
            String(justCreatedRecipe._id)
          ));
      } catch (e:any) {
        // handleFinishedSave(false, e.message)
        console.log(e.message);
      }

      // handleFinishedSave(true, "data saved successfully!")
    }
  };

  return (
    <Grid container justifyContent="center" rowGap={5}>
      <Grid item xs={10}>
        <Typography variant="h6" textAlign="center">
          Create new Recipe
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
          <Stack direction="row" spacing={4}>
            <MuiFileInput
              value={selectedImage}
              onChange={(file) => {
                setSelectedImage(file || null);
              }}
              placeholder="Add Image to Recipe"
              clearIconButtonProps={{
                title: "Remove",
                children: <Close fontSize="small" />,
              }}
              inputProps={{
                startAdornment: <AttachFile />,
                accept: ".png, .jpeg .jpg",
              }}
            />
            {selectedImage && (
              <div>
                <img
                  alt="not found"
                  width={"140px"}
                  src={URL.createObjectURL(selectedImage)}
                />
              </div>
            )}
          </Stack>

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
