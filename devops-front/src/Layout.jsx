import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

function Layout() {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate('/')}
        className="home-button"
      >
        На главную
      </button>
      
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
