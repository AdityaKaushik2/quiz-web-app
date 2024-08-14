import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Quizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/quiz/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setQuizzes(response.data);
            } catch (error) {
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
            await axios.delete(`http://localhost:8080/user/${userId}/quiz/${quizId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
            alert('Quiz deleted successfully');
        } catch (error) {
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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">My Quizzes</h1>
            <button
                onClick={handleCreateQuiz}
                className="mb-4 p-2 bg-green-500 text-white rounded"
            >
                Create New Quiz
            </button>
            {quizzes.length > 0 ? (
                <ul className="space-y-4">
                    {quizzes.map((quiz) => (
                        <li key={quiz.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold">{quiz.name}</h2>
                                    <p className="text-gray-600">{quiz.description}</p>
                                    <h2 className="text-xl font-bold">Code: {quiz.code}</h2>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleUpdateQuiz(quiz.id)}
                                        className="p-2 bg-blue-500 text-white rounded"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDeleteQuiz(quiz.id)}
                                        className="p-2 bg-red-500 text-white rounded"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleViewQuestions(quiz.id)}
                                        className="p-2 bg-purple-500 text-white rounded"
                                    >
                                        View Questions
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No quizzes found</p>
            )}
        </div>
    );
};

export default Quizzes;
