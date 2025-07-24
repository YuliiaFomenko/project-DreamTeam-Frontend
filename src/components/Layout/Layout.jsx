import React, { Suspense } from 'react'
import AppBar from '../AppBar/AppBar'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <div>
      <AppBar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <Toaster position='top-right' reverseOrder={false} />
    </div>
  );
}

export default Layout