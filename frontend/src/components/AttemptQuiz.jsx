import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AttemptQuiz = () => {
    const { quizCode } = useParams();
    const [quizData, setQuizData] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const token = localStorage.getItem('token');

                // Fetch the quiz data
                const response = await axios.get(`http://localhost:8080/quiz/${quizCode}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setQuizData(response.data);

                // Extract userId from the quiz data
                const userId = response.data.userId; // This should be the userId from the quiz data

                // Fetch questions using quizId from the response
                const quizId = response.data.id;
                const questionsResponse = await axios.get(`http://localhost:8080/user/${userId}/quiz/${quizId}/questions`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Fetch choices for each question
                const questionsWithChoices = await Promise.all(questionsResponse.data.map(async (question) => {
                    const choicesResponse = await axios.get(`http://localhost:8080/user/${userId}/quiz/${quizId}/question/${question.id}/choice`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return { ...question, choices: choicesResponse.data };
                }));

                setQuestions(questionsWithChoices);

            } catch (error) {
                console.error('Failed to fetch quiz data', error);
                setError('Failed to load quiz');
            }
        };

        fetchQuizData();
    }, [quizCode]);

    if (error) {
        return <div className="text-red-500 text-center mt-4">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            {quizData && (
                <>
                    <h2 className="text-3xl font-bold mb-4">{quizData.name}</h2>
                    <p className="mb-6">{quizData.description}</p>
                    {questions.map((question, index) => (
                        <div key={question.id} className="mb-6 p-4 border rounded-lg shadow-lg">
                            <h3 className="font-semibold mb-2">{`${index + 1}. ${question.content}`}</h3>
                            <div className="ml-4">
                                {Array.isArray(question.choices) ? (
                                    question.choices.map((choice) => (
                                        <div key={choice.id} className="mb-2">
                                            <label className="inline-flex items-center">
                                                <input type="radio" name={`question-${question.id}`} value={choice.id} className="form-radio h-5 w-5 text-indigo-600" />
                                                <span className="ml-2">{choice.content}</span>
                                            </label>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-red-500">No choices available for this question.</p>
                                )}
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default AttemptQuiz;
