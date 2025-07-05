import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import TechniquesPage from './pages/TechniquesPage';
import Clients from './pages/ClientsPage';
import ClientInfoPage from './pages/ClientInfoPage';
import RentalPage from './pages/RentalPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/rental" element={<RentalPage />} />
          <Route path="/techniques" element={<TechniquesPage />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/:id" element={<ClientInfoPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </MainLayout>
  );
}

export default App;
