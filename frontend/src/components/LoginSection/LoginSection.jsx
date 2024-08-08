import React from 'react';

const LoginSection = () => {
    return (
        <div className="login-section">
            <h2 className="text-2xl font-bold mb-5">Login</h2>
            <form className="flex flex-col">
                <input type="email" placeholder="Email" className="mb-3 p-2 border rounded" required />
                <input type="password" placeholder="Password" className="mb-3 p-2 border rounded" required />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Login</button>
            </form>
        </div>
    );
};

export default LoginSection;
