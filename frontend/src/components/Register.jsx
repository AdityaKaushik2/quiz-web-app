import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Ensuring all fields are filled by the user
        if (!firstName || !lastName || !username || !email || !password) {
            toast.error('Please fill out all fields.');
            return;
        }

        try {
            await axios.post('http://localhost:8080/api/user', {
                firstName,
                lastName,
                username,
                email,
                password,
            });
            toast.success('Registration successful!');
            navigate('/'); // Redirect to login page
        } catch (error) {
            console.error('Registration failed', error);
            toast.error('Registration failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
            <div className="p-8 max-w-md w-full bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h1>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    />
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    />
                    <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
