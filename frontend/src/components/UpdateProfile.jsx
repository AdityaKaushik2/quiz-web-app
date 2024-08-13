import { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');


    useEffect(() => {
        console.log("ProfilePage Loaded - userId:", userId, "token:", token); // Log userId and token
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const { firstName, lastName, email, username } = response.data;
                setFirstName(firstName);
                setLastName(lastName);
                setEmail(email);
                setUsername(username);
            } catch (error) {
                console.error('Failed to fetch user profile', error);
            }
        };

        fetchProfile();
    }, [userId, token]);

    const handleUpdate = async (e) => {
        e.preventDefault();
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
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update profile', error);
        }
    };

    const handleDelete = async () => {
        console.log("Attempting to delete user - userId:", userId); // Log userId before delete
        try {
            await axios.delete(`http://localhost:8080/api/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('User deleted successfully!');
            // Optionally redirect or logout after deletion
        } catch (error) {
            console.error('Failed to delete user', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-6 max-w-md w-full bg-white rounded-lg shadow-md">
                <h1 className="text-xl font-bold mb-4">Update Profile</h1>
                <form onSubmit={handleUpdate}>
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
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
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
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="New Password (optional)"
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mb-4">
                        Update Profile
                    </button>
                </form>
                <button
                    onClick={handleDelete}
                    className="w-full bg-red-500 text-white p-2 rounded"
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
