import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Quizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/user/quiz/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setQuizzes(response.data);
            } catch (error) {
                toast.error('Failed to fetch quizzes');
                console.error('Failed to fetch quizzes', error);
            }
        };
        fetchQuizzes();
    }, [token, userId]);

    const handleUpdateQuiz = (quizId) => {
        navigate(`/update-quiz/${quizId}`);
    };

    const handleDeleteQuiz = async (quizId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/user/${userId}/quiz/${quizId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
            toast.success('Quiz deleted successfully');
        } catch (error) {
            toast.error('Failed to delete quiz');
            console.error('Failed to delete quiz', error);
        }
    };

    const handleViewQuestions = (quizId) => {
        navigate(`/quiz/${quizId}/questions`);
    };

    const handleCreateQuiz = () => {
        navigate('/add-quiz');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-indigo-500 p-6">
            <div className="p-8 max-w-4xl w-full bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">My Quizzes</h1>
                <button
                    onClick={handleCreateQuiz}
                    className="mb-6 w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                    Create New Quiz
                </button>
                {quizzes.length > 0 ? (
                    <ul className="space-y-6">
                        {quizzes.map((quiz) => (
                            <li key={quiz.id} className="p-6 bg-gray-100 rounded-lg shadow-md">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-700">{quiz.name}</h2>
                                        <p className="text-gray-600 mt-2">{quiz.description}</p>
                                        <p className="text-gray-500 mt-1">Code: {quiz.code}</p>
                                    </div>
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() => handleUpdateQuiz(quiz.id)}
                                            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDeleteQuiz(quiz.id)}
                                            className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => handleViewQuestions(quiz.id)}
                                            className="p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                                        >
                                            View Questions
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-700 mt-6">No quizzes found</p>
                )}
            </div>
        </div>
    );
};

export default Quizzes;
