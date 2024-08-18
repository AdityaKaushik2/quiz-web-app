import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const UpdateQuiz = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchQuiz = async () => {
                const response = await axios.get(`http://localhost:8080/user/${userId}/quiz/${quizId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setName(response.data.name);
                setDescription(response.data.description);
        };

        fetchQuiz();
    }, [quizId, token, userId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/user/${userId}/quiz/${quizId}`, { name, description }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('Quiz updated successfully');
            navigate('/quizzes');
        } catch (error) {
            toast.error('Failed to update quiz');
            console.error('Failed to update quiz', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
            <div className="p-6 max-w-md w-full bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Update Quiz</h1>
                <form onSubmit={handleUpdate}>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Quiz Title"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Quiz Description"
                            rows="4"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateQuiz;
