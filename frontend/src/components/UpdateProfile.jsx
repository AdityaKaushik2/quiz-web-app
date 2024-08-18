import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProfilePage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !username) {
            toast.error('Please fill in all the required fields.');
            return;
        }

        try {
            await axios.put(
                `http://localhost:8080/api/user/${userId}`,
                { firstName, lastName, email, username, password },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error('Failed to update profile');
            console.error('Failed to update profile', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('User deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete user');
            console.error('Failed to delete user', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600">
            <div className="p-8 max-w-lg w-full bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Update Profile</h1>
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="New Password (optional)"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors">
                        Update Profile
                    </button>
                </form>
                <button
                    onClick={handleDelete}
                    className="w-full mt-4 bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors"
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
