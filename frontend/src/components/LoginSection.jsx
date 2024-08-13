import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });

            const { id: userId, jwtToken: token } = response.data;

            if (token && userId) {
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                toast.success('Login successful');
                navigate('/dashboard');
            } else {
                toast.error("Wrong Credentials")
                console.error('Token or userId is missing from the response');
            }
        } catch (error) {
            toast.error("Login failed")
            console.error('Login failed', error);
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-6 max-w-sm w-full bg-white rounded-lg shadow-md">
                <h1 className="text-xl font-bold mb-4">Login</h1>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <button className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">{`Don't have an account?`}</p>
                    <button
                        onClick={handleRegisterRedirect}
                        className="mt-2 text-blue-500 hover:underline"
                    >
                        Register Here
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
