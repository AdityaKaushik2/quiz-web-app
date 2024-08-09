import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/LoginSection.jsx';
import Register from './pages/Register';
import UserDetails from './pages/UserDetailsPage.jsx';
import Homepage from "./components/Homepage.jsx"; // Ensure this is the correct path

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user-details/:username" element={<UserDetails />} /> {/* Parameterized route */}
            </Routes>
        </Router>
    );
};

export default App;
