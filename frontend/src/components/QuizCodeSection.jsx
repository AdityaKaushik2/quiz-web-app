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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 to-cyan-500 p-8">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Enter Quiz Code</h2>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input
                        type="text"
                        placeholder="Enter Quiz Code"
                        value={quizCode}
                        onChange={(e) => setQuizCode(e.target.value)}
                        className="mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full p-3 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition-colors"
                    >
                        Start Quiz
                    </button>
                </form>
            </div>
        </div>
    );
};

export default QuizCodeSection;
