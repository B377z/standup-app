import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Proposals from './pages/Proposals';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" exact component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="/proposals" component={Proposals} />
    </Routes>
  </Router>
);

export default App;
