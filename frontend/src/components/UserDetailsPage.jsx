import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDetailsPage = () => {
    const { username } = useParams(); // Extract username from URL parameters
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch user details
        const fetchUserDetails = async () => {
            try {
                const storedUsername = localStorage.getItem('username');
                const storedPassword = localStorage.getItem('password');
                const authHeader = `Basic ${btoa(`${storedUsername}:${storedPassword}`)}`;

                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/user/${username}`, {
                    headers: {
                        'Authorization': authHeader
                    }
                });
                setUserDetails(response.data);
            } catch (err) {
                // Log detailed error information
                setError('Failed to fetch user details.');
                console.error('Error fetching user details:', err.response ? err.response.data : err.message);
            }
        };

        // Call fetchUserDetails only if username is available
        if (username) {
            fetchUserDetails();
        }
    }, [username]);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">User Details</h1>
            {error && <p className="text-red-500">{error}</p>}
            {userDetails ? (
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <p><strong>Username:</strong> {userDetails.username}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <p><strong>First Name:</strong> {userDetails.firstName}</p>
                    <p><strong>Last Name:</strong> {userDetails.lastName}</p>
                </div>
            ) : (
                <p>Loading User Details...</p>
            )}
        </div>
    );
};

export default UserDetailsPage;
