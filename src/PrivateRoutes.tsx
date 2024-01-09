import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MyRecipes from './pages/MyRecipes';
import { Grid } from '@mui/material';
import {NavBar} from './components/Navbar/index'

export const PrivateRoutes = () => {
    return (
        <Grid container justifyContent="center" rowGap={5}>

        <NavBar/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myrecipes" element={<MyRecipes />} />
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
        </Grid>
    );
};