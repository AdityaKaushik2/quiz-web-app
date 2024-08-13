import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateQuiz = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/${userId}/quiz/${quizId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTitle(response.data.title);
                setDescription(response.data.description);
            } catch (error) {
                console.error('Failed to fetch quiz', error);
            }
        };

        fetchQuiz();
    }, [quizId, token, userId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/user/${userId}/quiz/${quizId}`, { title, description }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Quiz updated successfully');
            navigate('/quizzes');
        } catch (error) {
            console.error('Failed to update quiz', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-6 max-w-sm w-full bg-white rounded-lg shadow-md">
                <h1 className="text-xl font-bold mb-4">Update Quiz</h1>
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Quiz Title"
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Quiz Description"
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <button className="w-full bg-blue-500 text-white p-2 rounded">Update</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateQuiz;
