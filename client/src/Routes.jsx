import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AgendaPage from './components/AgendaPage';
import CallForProposalsForm from './components/CallForProposalsForm';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/agenda" element={<AgendaPage />} />
                <Route path="/c4p" element={<CallForProposalsForm />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;


