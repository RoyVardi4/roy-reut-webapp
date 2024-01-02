import { FC, memo, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  Avatar,
  CardActions,
  Collapse,
  Typography,
} from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import { red } from "@mui/material/colors";
import { removeTags } from "../../helpers/StringFunctions";
import { IRecipe } from "../../interfaces/Recipe";
import { useQuery } from "react-query";
import RecipeSkeleton from "./Skeleton";
import RecipesAPI from "../../api/Recipes";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const arePropsEqual = (
  prevProps: Readonly<{ recipe: IRecipe }>,
  nextProps: Readonly<{ recipe: IRecipe }>
) => {
  return prevProps.recipe.id === nextProps.recipe.id;
};

const RecipesItem: FC<{ recipe: IRecipe }> = ({ recipe }) => {
  const [expanded, setExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { isLoading, error, data } = useQuery<IRecipe, Error>(
    ["RecipeInfo", recipe.id],
    () => RecipesAPI.getRecipeInformationById(recipe.id)
  );

  const calculatedLikes =
    data?.aggregateLikes && data?.aggregateLikes + Number(isLiked);

  if (isLoading)
    return (
      <Grid item xs={12} md={3} justifyContent="center">
        <RecipeSkeleton />
      </Grid>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <Grid item xs={12} md={3} justifyContent="center">
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              <PersonIcon />
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={data?.title}
          subheader={`ready in: ${data?.readyInMinutes} minutes`}
        />
        <CardMedia
          component="img"
          height="194"
          image={data?.image}
          alt={data?.image}
        />
        <CardContent>
          {calculatedLikes && (
            <Typography variant="body2" color="text.secondary">
              {`Likes: ${calculatedLikes}`}
            </Typography>
          )}
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            onClick={() => setIsLiked((prevState) => !prevState)}
            aria-label="add to favorites"
          >
            <FavoriteIcon color={isLiked ? "error" : "inherit"} />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{removeTags(data?.instructions)}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

export default memo(RecipesItem, arePropsEqual);
