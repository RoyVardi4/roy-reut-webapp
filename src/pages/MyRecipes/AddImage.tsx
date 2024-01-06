import { FC, useState } from "react";
import RecipesAPI from "../../api/Recipes";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { AttachFile, Close } from "@mui/icons-material";
import { MuiFileInput } from "mui-file-input";

interface IProps {
  recipeToUpdateId: string;
  recipeToUpdateName: string;
  handleFinishedSave: (isSuccess: boolean, message: string) => void;
}

const AddImageToRecipe: FC<IProps> = ({
  recipeToUpdateId,
  recipeToUpdateName,
  handleFinishedSave,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (recipeToUpdateId && selectedImage) {
      try {
        await RecipesAPI.addImageToRecipe(selectedImage, recipeToUpdateId!);
      } catch (e: any) {
        console.log(e.message);
        handleFinishedSave(false, e.message);
      }

      handleFinishedSave(true, "data saved successfully!");
    }
  };

  return (
    <Grid container justifyContent="center" rowGap={5}>
      <Grid item xs={10}>
        <Typography variant="h6" textAlign="center">
          Attach image to Recipe: {recipeToUpdateName}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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

export default AddImageToRecipe;
