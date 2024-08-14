// src/pages/Choices.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';

const Choices = ({ quizId, questionId }) => {
    const [choices, setChoices] = useState([]);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchChoices = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/${userId}/quiz/${quizId}/question/${questionId}/choice`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setChoices(response.data);
            } catch (error) {
                console.error('Failed to fetch choices', error);
            }
        };

        fetchChoices();
    }, [quizId, questionId, token]);

    return (
        <div className="p-4">
            {choices.length > 0 ? (
                <ul className="pl-5 list-disc">
                    {choices.map((choice) => (
                        <li key={choice.id}>{choice.content}</li>
                    ))}
                </ul>
            ) : (
                <p>No choices found</p>
            )}
        </div>
    );
};

export default Choices;
