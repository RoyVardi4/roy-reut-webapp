import { FC } from "react";
import RecipesAPI from "../../api/Recipes";
import { IRecipeComment } from "../../interfaces/RecipeComment";
import { Button, Typography } from "@mui/material";

interface IProps {
  comments: IRecipeComment[];
}

const Comments: FC<IProps> = ({ comments }) => {
  return (
    <>
      <Button onClick={() => RecipesAPI.postComment()}>add comment</Button>
      {comments?.map((comment) => (
        <Typography>{comment.desc}</Typography>
      ))}
    </>
  );
};

export default Comments;
