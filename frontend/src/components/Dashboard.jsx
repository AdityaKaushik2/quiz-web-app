import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCredentials } from '../redux/userSlice';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGetQuizzes = () => {
        toast.info("Fetching your quizzes...");
        navigate('/quizzes');
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        dispatch(clearCredentials());
        toast.success("Successfully logged out!");
        navigate('/login');
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl mx-4 sm:mx-0">
                <h1 className="text-5xl font-extrabold text-gray-800 mb-6 text-center">Welcome!</h1>
                <button
                    onClick={handleLogout}
                    className="absolute top-4 right-4 bg-red-700 text-white px-6 py-3 rounded-full shadow-xl hover:bg-red-800 transition-colors"
                >
                    Logout
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                    <Link to="/add-quiz" className="flex flex-col items-center justify-center p-8 bg-blue-600 text-white rounded-lg shadow-lg transform transition-transform hover:scale-105">
                        <span className="text-3xl font-semibold mb-2">Add Quiz</span>
                        <i className="fas fa-plus-circle fa-2x"></i>
                    </Link>
                    <Link to="/update-profile" className="flex flex-col items-center justify-center p-8 bg-green-600 text-white rounded-lg shadow-lg transform transition-transform hover:scale-105">
                        <span className="text-3xl font-semibold mb-2">Update Profile</span>
                        <i className="fas fa-user-edit fa-2x"></i>
                    </Link>
                    <button
                        onClick={handleGetQuizzes}
                        className="flex flex-col items-center justify-center p-8 bg-yellow-600 text-white rounded-lg shadow-lg transform transition-transform hover:scale-105"
                    >
                        <span className="text-3xl font-semibold mb-2">Get My Quizzes</span>
                        <i className="fas fa-list-ul fa-2x"></i>
                    </button>
                    <Link to="/attempt-quiz" className="flex flex-col items-center justify-center p-8 bg-red-600 text-white rounded-lg shadow-lg transform transition-transform hover:scale-105">
                        <span className="text-3xl font-semibold mb-2">Attempt a Quiz</span>
                        <i className="fas fa-pencil-alt fa-2x"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
