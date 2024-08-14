
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Choices from './Choices';  // Import the Choices component

const Questions = () => {
    const { quizId } = useParams();
    const [questions, setQuestions] = useState([]);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/${userId}/quiz/${quizId}/questions`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setQuestions(response.data);
            } catch (error) {
                console.error('Failed to fetch questions', error);
            }
        };

        fetchQuestions();
    }, [quizId, token]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Questions for Quiz ID: {quizId}</h1>
            {questions.length > 0 ? (
                <ul className="space-y-4">
                    {questions.map((question) => (
                        <li key={question.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                            <div>
                                <h2 className="text-lg font-bold">{question.content}</h2>
                                <Choices quizId={quizId} questionId={question.id} />  {/* Use Choices component */}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No questions found</p>
            )}
        </div>
    );
};

export default Questions;
