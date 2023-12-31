import { FC, useMemo, useState } from "react";
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

const RecipesItem: FC<{ recipe: IRecipe }> = ({ recipe }) => {
  const [expanded, setExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const calculatedLikes = useMemo(
    () => recipe.aggregateLikes || 0 + Number(isLiked),
    [isLiked, recipe.id]
  );

  return (
    <Grid item xs={12} md={3} justifyContent="center">
      <Card sx={{ maxWidth: 345, }}>
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
          title={recipe.title}
          subheader={`ready in (minutes): ${recipe.readyInMinutes}`}
        />
        <CardMedia
          component="img"
          height="194"
          image={recipe.image}
          alt={recipe.image}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {`Likes: ${calculatedLikes}`}
          </Typography>
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
            <Typography paragraph>{removeTags(recipe.instructions)}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

export default RecipesItem;
