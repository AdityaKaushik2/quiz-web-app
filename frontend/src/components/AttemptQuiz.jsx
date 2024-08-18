import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AttemptQuiz = () => {
    const { quizCode } = useParams();
    const [quizData, setQuizData] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [error, setError] = useState('');
    const [apiResponse, setApiResponse] = useState(null);

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
                const userId = response.data.userId;

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

    const handleOptionChange = (questionId, choiceId) => {
        if (!submitted) {
            setSelectedOptions((prevState) => ({
                ...prevState,
                [questionId]: choiceId,
            }));
        }
    };

    const handleSubmit = async () => {
        let calculatedScore = 0;

        questions.forEach((question) => {
            const selectedChoice = question.choices.find(choice => choice.id === selectedOptions[question.id]);
            if (selectedChoice && selectedChoice.correct) {
                calculatedScore += 1;
            }
        });

        setScore(calculatedScore);
        setSubmitted(true);

        // Prepare data to send to the API
        const dataToSend = {
            score: calculatedScore,
            quiz: {
                id: quizData.id,
            },
            user: {
                id: quizData.userId,
            },
        };

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/api/user-quiz/store', dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setApiResponse(response.data);
            console.log('Quiz data successfully sent:', response.data);
        } catch (error) {
            console.error('Failed to send quiz data', error);
            setApiResponse('Failed to send quiz data');
        }
    };

    if (error) {
        return <div className="text-red-600 text-center mt-4">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center p-8">
            <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 border border-gray-300">
                {quizData && (
                    <>
                        <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">{quizData.name}</h2>
                        <p className="text-gray-700 mb-6 text-center">{quizData.description}</p>
                        {questions.map((question, index) => (
                            <div key={question.id} className="mb-6 p-6 border rounded-lg bg-gray-50 shadow-md">
                                <h3 className="text-xl font-semibold mb-4 text-gray-800">{`${index + 1}. ${question.content}`}</h3>
                                <div className="ml-4 space-y-4">
                                    {Array.isArray(question.choices) ? (
                                        question.choices.map((choice) => {
                                            const isSelected = selectedOptions[question.id] === choice.id;
                                            const isCorrect = choice.correct;
                                            const backgroundColor = submitted
                                                ? isCorrect
                                                    ? 'bg-green-100'
                                                    : isSelected
                                                        ? 'bg-red-100'
                                                        : 'bg-gray-50'
                                                : isSelected
                                                    ? 'bg-blue-100'
                                                    : 'bg-gray-50';

                                            return (
                                                <div key={choice.id} className={`p-4 border rounded-md ${backgroundColor}`}>
                                                    <label className="inline-flex items-center text-gray-800">
                                                        <input
                                                            type="radio"
                                                            name={`question-${question.id}`}
                                                            value={choice.id}
                                                            onChange={() => handleOptionChange(question.id, choice.id)}
                                                            className="form-radio h-5 w-5 text-indigo-600"
                                                            disabled={submitted}
                                                        />
                                                        <span className="ml-3 text-lg">{choice.content}</span>
                                                    </label>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="text-red-500 text-center">No choices available for this question.</p>
                                    )}
                                </div>
                            </div>
                        ))}
                        {!submitted && (
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
                            >
                                Submit Quiz
                            </button>
                        )}
                        {submitted && (
                            <div className="mt-6 text-center">
                                <p className="text-2xl font-semibold text-gray-800">
                                    You scored {score} out of {questions.length}
                                </p>
                                {apiResponse && (
                                    <p className="text-green-600 mt-4">
                                        {typeof apiResponse === 'string' ? apiResponse : 'Quiz data has been successfully stored!'}
                                    </p>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AttemptQuiz;
