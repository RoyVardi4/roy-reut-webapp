import { Grid, Typography } from "@mui/material";
import Login from "../../components/Login";

const LoginPage = () => {
  return (
    <Grid container justifyContent="center" rowGap={5}>
      <Grid item xs={10}>
        <Typography variant="h6" textAlign="center">
          Welcome to Reut and Roy's Recipe webapp
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Login />
      </Grid>
    </Grid>
  );
};

export default LoginPage;
