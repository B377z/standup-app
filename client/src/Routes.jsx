import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Agenda from './components/Agenda';
import C4PForm from './components/C4PForm';
import LoginPage from './components/LoginPage';
import Backoffice from './components/Backoffice';
import ReviewProposals from './components/ReviewProposals';
import AgendaItems from './components/AgendaItems';
import Notifications from './components/Notifications';
import Events from './components/Events';
import Header from './components/Header';
import { AuthProvider, AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/c4p" element={<C4PForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/backoffice"
            element={
              <ProtectedRoute>
                <Backoffice />
              </ProtectedRoute>
            }
          >
            <Route path="review-proposals" element={<ReviewProposals />} />
            <Route path="agenda-items" element={<AgendaItems />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="events" element={<Events />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;


