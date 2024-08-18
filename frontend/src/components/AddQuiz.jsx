import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddQuiz = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const validateInput = (input) => {
        const regex = /^[A-Za-z0-9\s@$]*$/; // Only letters, numbers, spaces, $ and @ are allowed
        return input.trim() !== '' && regex.test(input);
    };

    const handleAddQuiz = async (e) => {
        e.preventDefault();

        if (!validateInput(name)) {
            toast.error('Invalid Quiz Title. Only letters, numbers, spaces, $ and @ are allowed.');
            return;
        }

        if (!validateInput(description)) {
            toast.error('Invalid Quiz Description. Only letters, numbers, spaces, $ and @ are allowed.');
            return;
        }

        try {
            await axios.post(
                `http://localhost:8080/${userId}/quiz`,
                { name, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Quiz added successfully!');
            navigate('/quizzes');
        } catch (error) {
            toast.error('Failed to add quiz');
            console.error('Failed to add quiz', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
            <div className="p-8 max-w-lg w-full bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Add Quiz</h1>
                <form onSubmit={handleAddQuiz}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Quiz Title"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Quiz Description"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        rows="4"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Add Quiz
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddQuiz;
