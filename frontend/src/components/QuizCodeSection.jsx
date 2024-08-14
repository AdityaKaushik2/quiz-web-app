import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizCodeSection = () => {
    const [quizCode, setQuizCode] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/attempt-quiz/${quizCode}`);
    };

    return (
        <div className="quiz-code-section">
            <h2 className="text-2xl font-bold mb-5">Enter Quiz Code</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input
                    type="text"
                    placeholder="Enter Quiz Code"
                    value={quizCode}
                    onChange={(e) => setQuizCode(e.target.value)}
                    className="mb-3 p-2 border rounded"
                    required
                />
                <button type="submit" className="p-2 bg-green-500 text-white rounded hover:bg-green-700">Start Quiz</button>
            </form>
        </div>
    );
};

export default QuizCodeSection;
