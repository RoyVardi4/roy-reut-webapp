import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MyRecipes from "./pages/MyRecipes";
import UserProfile from "./pages/UserProfile";
import { Grid } from "@mui/material";
import { NavBar } from "./components/Navbar/index";

export const PrivateRoutes = () => {
  return (
    <Grid container justifyContent="center" rowGap={5}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myrecipes" element={<MyRecipes />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Grid>
  );
};
