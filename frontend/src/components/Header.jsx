import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="sticky top-0 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="text-2xl font-bold">
                        <Link to="/dashboard">My App</Link>
                    </div>
                    <nav className="space-x-4">
                        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                        <Link to="/quizzes" className="hover:underline">Quizzes</Link>
                        <Link to="/update-profile" className="hover:underline">Profile</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
