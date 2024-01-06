import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MyRecipes from './pages/MyRecipes';

export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myrecipes" element={<MyRecipes />} />
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};