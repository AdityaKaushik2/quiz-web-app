import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials, setStatus, setError } from '../redux/userSlice';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(setStatus('loading'));
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/auth/login`, { username, password });
            const { id: userId, jwtToken: token } = response.data;

            if (token && userId) {
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                dispatch(setCredentials({ userId, token }));
                dispatch(setStatus('succeeded'));
                toast.success('Login successful');
                navigate('/dashboard');
            } else {
                toast.error("Wrong Credentials");
                dispatch(setError("Wrong Credentials"));
            }
        } catch (error) {
            toast.error("Wrong Credentials");
            dispatch(setError('Login failed'));
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div
            className="flex items-center justify-center h-screen bg-cover bg-center"
            style={{ backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1668736594225-55e292fdd95e?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}
        >
            <div className="p-8 max-w-sm w-full bg-white bg-opacity-95 rounded-lg shadow-xl">
                <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">Login</h1>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-300">
                        Login
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-700">{`Don't have an account?`}</p>
                    <button
                        onClick={handleRegisterRedirect}
                        className="mt-2 text-blue-600 hover:underline"
                    >
                        Register Here
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
