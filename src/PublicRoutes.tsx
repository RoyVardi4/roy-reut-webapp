import { Navigate, Route, Routes } from 'react-router-dom';
import RegistrationPage from './pages/Registration';
import LoginPage from './pages/Login';

export const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
    );
};