import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className='container mx-auto flex content-center'>
      <Outlet />
    </div>
  );
}

export default Layout;
