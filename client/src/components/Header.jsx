import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LogoutButton from './LogoutButton';

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/agenda">Agenda</Link>
        <Link to="/c4p">Call for Proposals</Link>
        {user ? (
          <>
            <Link to="/backoffice">Backoffice</Link>
            <LogoutButton />
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;


