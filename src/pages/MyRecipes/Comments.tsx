import { FC, useState } from "react";
import RecipesAPI from "../../api/Recipes";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { IMyRecipe } from "../../interfaces/Recipe";
import { Send } from "@mui/icons-material";
import ModeCommentIcon from "@mui/icons-material/ModeComment";

interface IProps {
  recipeId: string;
}

const Comments: FC<IProps> = ({ recipeId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const {
    isLoading,
    error,
    data: recipe,
    refetch,
  } = useQuery<IMyRecipe, Error>(["UserRecipeComments", recipeId], () =>
    RecipesAPI.getUserRecipeComments(recipeId)
  );

  // Use useMutation to update a todo
  const addCommentMutation = useMutation<
    IMyRecipe,
    Error,
    { recipeId: string; updatedData: { desc: string } }
  >(
    ({ recipeId, updatedData }) =>
      RecipesAPI.postComment(recipeId, updatedData),
    {
      onSuccess: () => {
        // Refetch the todos after mutation is successful
        refetch();
      },
    }
  );

  const handleAddComment = async (
    recipeId: string,
    updatedData: { desc: string }
  ) => {
    addCommentMutation.mutateAsync({ recipeId, updatedData });
  };

  const handleSubmit = () => {
    handleAddComment(recipeId, {
      desc: newComment,
    });
    setNewComment("");
  };

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Button fullWidth endIcon={<ModeCommentIcon />} variant="text" onClick={() => setIsDialogOpen(true)}>
        Comments
      </Button>
      <Dialog
        fullWidth
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        <Card>
          <CardHeader title="Comments"></CardHeader>
          <CardContent>
            <div
              style={{ overflow: "auto", maxHeight: "20em", minHeight: "20em" }}
            >
              {recipe?.comments?.map((comment) => (
                <Stack m={2} key={comment._id} direction="row" gap={1}>
                  <Avatar></Avatar>
                  <Stack>
                    <Typography variant="caption">{comment.author}</Typography>
                    <Typography variant="subtitle2">{comment.desc}</Typography>
                  </Stack>
                </Stack>
              ))}
            </div>
            <Stack direction="row">
              <TextField
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                multiline
                fullWidth
                placeholder="add new comment"
              ></TextField>
              <Tooltip title="send">
                <IconButton color="primary" onClick={handleSubmit}>
                  <Send />
                </IconButton>
              </Tooltip>
            </Stack>
          </CardContent>
        </Card>
      </Dialog>
    </>
  );
};

export default Comments;
