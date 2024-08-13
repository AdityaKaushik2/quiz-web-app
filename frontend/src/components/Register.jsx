import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/user', {
                firstName,
                lastName,
                username,
                email,
                password,
            });
            toast.success('Registration successful!');
            navigate('/');  // Redirect to login page
        } catch (error) {
            console.error('Registration failed', error);
            toast.error('Registration failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-6 max-w-sm w-full bg-white rounded-lg shadow-md">
                <h1 className="text-xl font-bold mb-4">Register</h1>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <button className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
