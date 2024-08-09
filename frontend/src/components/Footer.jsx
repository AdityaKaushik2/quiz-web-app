import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center">
                    <span className="text-lg font-semibold">My App</span>
                </div>
                <div className="flex space-x-4">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Facebook</a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Twitter</a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Instagram</a>
                </div>
                <div>
                    <span>&copy; {new Date().getFullYear()} My App. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
