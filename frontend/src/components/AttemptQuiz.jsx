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

    const handleSubmit = () => {
        let calculatedScore = 0;

        questions.forEach((question) => {
            const selectedChoice = question.choices.find(choice => choice.id === selectedOptions[question.id]);
            if (selectedChoice && selectedChoice.correct) {
                calculatedScore += 1;
            }
        });

        setScore(calculatedScore);
        setSubmitted(true);
    };

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
                                    question.choices.map((choice) => {
                                        const isSelected = selectedOptions[question.id] === choice.id;
                                        const isCorrect = choice.correct;
                                        const backgroundColor = submitted
                                            ? isCorrect
                                                ? 'bg-green-500'
                                                : isSelected
                                                    ? 'bg-red-500'
                                                    : 'bg-white'
                                            : isSelected
                                                ? 'bg-blue-100'
                                                : 'bg-white';

                                        return (
                                            <div key={choice.id} className={`mb-2 p-2 border rounded`} style={{ backgroundColor }}>
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name={`question-${question.id}`}
                                                        value={choice.id}
                                                        onChange={() => handleOptionChange(question.id, choice.id)}
                                                        className="form-radio h-5 w-5 text-indigo-600"
                                                        disabled={submitted}
                                                    />
                                                    <span className="ml-2">{choice.content}</span>
                                                </label>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-red-500">No choices available for this question.</p>
                                )}
                            </div>
                        </div>
                    ))}
                    {!submitted && (
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                        >
                            Submit Quiz
                        </button>
                    )}
                    {submitted && (
                        <div className="mt-6 text-center">
                            <p className="text-xl font-semibold">
                                You scored {score} out of {questions.length}
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AttemptQuiz;
