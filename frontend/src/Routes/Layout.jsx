import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';

const Layout = () => {
    const location = useLocation();
    const noHeaderRoutes = ['/', '/login', '/register'];

    const showHeader = !noHeaderRoutes.includes(location.pathname);

    return (
        <div className="min-h-screen overflow-hidden">
            {showHeader && <Header />}
            <main className={showHeader ? 'content-with-header' : 'content-no-header'}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
