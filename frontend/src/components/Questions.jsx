import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Questions = () => {
    const { quizId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [newChoice, setNewChoice] = useState('');
    const [newChoiceCorrect, setNewChoiceCorrect] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [updatedQuestionContent, setUpdatedQuestionContent] = useState('');
    const [editingChoice, setEditingChoice] = useState(null);
    const [updatedChoiceContent, setUpdatedChoiceContent] = useState('');
    const [updatedChoiceCorrect, setUpdatedChoiceCorrect] = useState(false);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_REACT_APP_API_URL}/user/${userId}/quiz/${quizId}/questions`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setQuestions(response.data);
            } catch (error) {
                toast.error('Failed to fetch questions');
                console.error('Failed to fetch questions', error);
            }
        };

        fetchQuestions();
    }, [quizId, token, userId]);

    const handleAddQuestion = async () => {
        if (newQuestion.trim() === '') {
            toast.error('Question content cannot be empty');
            return;
        }
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_URL}/user/${userId}/quiz/${quizId}/questions`,
                { content: newQuestion },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setQuestions([...questions, response.data]);
            setNewQuestion('');
            toast.success('Question added successfully!');
        } catch (error) {
            toast.error('Failed to add question');
            console.error('Failed to add question', error);
        }
    };

    const handleEditQuestion = (question) => {
        setEditingQuestion(question.id);
        setUpdatedQuestionContent(question.content);
    };

    const handleUpdateQuestion = async (questionId) => {
        if (updatedQuestionContent.trim() === '') {
            toast.error('Question content cannot be empty');
            return;
        }
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_REACT_APP_API_URL}/user/${userId}/quiz/${quizId}/questions/${questionId}`,
                { content: updatedQuestionContent },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setQuestions(questions.map((q) => (q.id === questionId ? response.data : q)));
            setEditingQuestion(null);
            toast.success('Question updated successfully!');
        } catch (error) {
            toast.error('Failed to update question');
            console.error('Failed to update question', error);
        }
    };

    const handleDeleteQuestion = async (questionId) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_REACT_APP_API_URL}/user/${userId}/quiz/${quizId}/questions/${questionId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setQuestions(questions.filter((q) => q.id !== questionId));
            toast.success('Question deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete question');
            console.error('Failed to delete question', error);
        }
    };

    const handleAddChoice = async (questionId) => {
        if (newChoice.trim() === '') {
            toast.error('Choice content cannot be empty');
            return;
        }

        const question = questions.find((q) => q.id === questionId);
        if (question.choices && question.choices.some((choice) => choice.content === newChoice.trim())) {
            toast.error('Choice content must be unique');
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_URL}/user/${userId}/quiz/${quizId}/question/${questionId}/choice`,
                { content: newChoice, correct: newChoiceCorrect },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setQuestions(questions.map((q) =>
                q.id === questionId ? { ...q, choices: [...(q.choices || []), response.data] } : q
            ));
            setNewChoice('');
            setNewChoiceCorrect(false);
            toast.success('Choice added successfully!');
        } catch (error) {
            toast.error('Failed to add choice');
            console.error('Failed to add choice', error);
        }
    };

    const handleEditChoice = (choice) => {
        setEditingChoice(choice.id);
        setUpdatedChoiceContent(choice.content);
        setUpdatedChoiceCorrect(choice.correct);
    };

    const handleUpdateChoice = async (questionId, choiceId) => {
        if (updatedChoiceContent.trim() === '') {
            toast.error('Choice content cannot be empty');
            return;
        }

        const question = questions.find((q) => q.id === questionId);
        if (question.choices && question.choices.some((choice) => choice.content === updatedChoiceContent.trim() && choice.id !== choiceId)) {
            toast.error('Choice content must be unique');
            return;
        }

        try {
            const response = await axios.put(
                `${import.meta.env.VITE_REACT_APP_API_URL}/user/${userId}/quiz/${quizId}/question/${questionId}/choice/${choiceId}`,
                { content: updatedChoiceContent, correct: updatedChoiceCorrect },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setQuestions(questions.map((q) =>
                q.id === questionId ? {
                    ...q, choices: q.choices.map((choice) =>
                        choice.id === choiceId ? response.data : choice
                    )
                } : q
            ));
            setEditingChoice(null);
            toast.success('Choice updated successfully!');
        } catch (error) {
            toast.error('Failed to update choice');
            console.error('Failed to update choice', error);
        }
    };

    const handleDeleteChoice = async (questionId, choiceId) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_REACT_APP_API_URL}/user/${userId}/quiz/${quizId}/question/${questionId}/choice/${choiceId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setQuestions(questions.map((q) =>
                q.id === questionId ? { ...q, choices: q.choices.filter((choice) => choice.id !== choiceId) } : q
            ));
            toast.success('Choice deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete choice');
            console.error('Failed to delete choice', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6">
            <h1 className="text-2xl font-bold mb-6 text-white">Questions</h1>

            {/* Add new question section */}
            <div className="mb-6">
                <input
                    type="text"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Enter new question"
                    className="w-full p-3 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <div className="flex justify-center">
                    <button
                        onClick={handleAddQuestion}
                        className="p-3 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg w-1/6 hover:bg-green-600 transition-colors"
                    >
                        Add Question
                    </button>
                </div>
            </div>

            {/* Questions list */}
            {questions.length > 0 ? (
                <ul className="space-y-4">
                    {questions.map((question) => (
                        <li key={question.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                            <div>
                                {editingQuestion === question.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={updatedQuestionContent}
                                            onChange={(e) => setUpdatedQuestionContent(e.target.value)}
                                            className="w-full p-3 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        />
                                        <div className="flex">
                                            <button
                                                onClick={() => handleUpdateQuestion(question.id)}
                                                className="p-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg w-1/8 hover:bg-blue-600 transition-colors"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-lg font-bold">{question.content}</h2>
                                    </>
                                )}
                            </div>
                            <div className="flex space-x-2 mt-4">
                                <button
                                    onClick={() => handleEditQuestion(question)}
                                    className="p-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg w-1/8 hover:bg-blue-600 transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteQuestion(question.id)}
                                    className="p-2 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-lg w-1/8 hover:bg-red-600 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>

                            {/* Add new choice section */}
                            {(!question.choices || question.choices.length < 4) && (
                                <div className="mt-4">
                                    <input
                                        type="text"
                                        value={newChoice}
                                        onChange={(e) => setNewChoice(e.target.value)}
                                        placeholder="Enter new choice"
                                        className="w-full p-3 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    />
                                    <div className="flex items-center mt-2">
                                        <input
                                            type="checkbox"
                                            checked={newChoiceCorrect}
                                            onChange={(e) => setNewChoiceCorrect(e.target.checked)}
                                            className="mr-2"
                                        />
                                        <label className="text-blue-700">Correct</label>
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                            onClick={() => handleAddChoice(question.id)}
                                            className="p-3 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg w-1/6 hover:bg-green-600 transition-colors mt-2"
                                        >
                                            Add Choice
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Choices list */}
                            {question.choices && (
                                <ul className="space-y-2 mt-4">
                                    {question.choices.map((choice, index) => (
                                        <li key={choice.id} className="p-2 bg-white rounded-lg shadow-sm border">
                                            {editingChoice === choice.id ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        value={updatedChoiceContent}
                                                        onChange={(e) => setUpdatedChoiceContent(e.target.value)}
                                                        className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                                    />
                                                    <div className="flex items-center mt-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={updatedChoiceCorrect}
                                                            onChange={(e) => setUpdatedChoiceCorrect(e.target.checked)}
                                                            className="mr-2"
                                                        />
                                                        <label>Correct</label>
                                                    </div>
                                                    <div className="flex ">
                                                        <button
                                                            onClick={() => handleUpdateChoice(question.id, choice.id)}
                                                            className="p-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg w-1/8 hover:bg-blue-600 transition-colors mt-2"
                                                        >
                                                            Update
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <span>Option {index + 1}: {choice.content} ({choice.correct ? 'Correct' : 'Incorrect'})</span>
                                            )}
                                            <div className="flex space-x-2 mt-2">
                                                <button
                                                    onClick={() => handleEditChoice(choice)}
                                                    className="p-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg w-1/8 hover:bg-blue-600 transition-colors"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteChoice(question.id, choice.id)}
                                                    className="p-2 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-lg w-1/8 hover:bg-red-600 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-white">No questions available</p>
            )}
        </div>
    );
};

export default Questions;
