import { useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import RecipesList from "../../components/RecipesList";
import { useDebounce } from "../../hooks/useDebounce";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce<string>(searchText, 500)

  return (
    <Grid container justifyContent="center" rowGap={5}>
      <Grid item xs={10}>
        <Typography variant="h6" textAlign="center">
          Welcome to Reut and Roy's Recipe webapp
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <TextField
          fullWidth
          label="search"
          id="fullWidth"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Grid>
      <Grid item xs={10}>
        <RecipesList queryString={debouncedSearchText} />
      </Grid>
    </Grid>
  );
};

export default Home;
