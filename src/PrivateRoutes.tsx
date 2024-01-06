import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};