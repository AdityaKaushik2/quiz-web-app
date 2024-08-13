import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddQuiz = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleAddQuiz = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/${userId}/quiz`,
                { name, description },
                { headers: { Authorization: `Bearer ${token}` } });
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to add quiz', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-6 max-w-sm w-full bg-white rounded-lg shadow-md">
                <h1 className="text-xl font-bold mb-4">Add Quiz</h1>
                <form onSubmit={handleAddQuiz}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Quiz Title"
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Quiz Description"
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <button className="w-full bg-blue-500 text-white p-2 rounded">Add Quiz</button>
                </form>
            </div>
        </div>
    );
};

export default AddQuiz;
