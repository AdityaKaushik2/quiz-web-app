import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddQuiz from './components/AddQuiz';
import UpdateProfile from './components/UpdateProfile';
import Quizzes from './components/Quizzes';
import UpdateQuiz from './components/UpdateQuiz';
import LoginPage from './components/LoginSection.jsx';
import RegisterPage from './components/Register.jsx';
import Questions from './components/Questions.jsx';
import QuizCodeSection from "./components/QuizCodeSection.jsx";
import AttemptQuiz from "./components/AttemptQuiz.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-quiz" element={<AddQuiz />} />
                <Route path="/update-profile" element={<UpdateProfile />} />
                <Route path="/quizzes" element={<Quizzes />} />
                <Route path="/update-quiz/:quizId" element={<UpdateQuiz />} />
                <Route path="/quiz/:quizId/questions" element={<Questions />} />
                <Route path="/attempt-quiz" element={<QuizCodeSection />} />
                <Route path="/attempt-quiz/:quizCode" element={<AttemptQuiz />} />
            </Routes>
        </Router>
    );
}

export default App;
