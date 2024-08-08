import React from 'react';
import LoginSection from '../LoginSection/LoginSection';
import QuizCodeSection from '../QuizCodeSection/QuizCodeSection';

const Homepage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-full">
            <div className="flex flex-row justify-around items-center w-full max-w-4xl mt-40">
                <div className="w-1/2 p-5 border border-gray-300 rounded-lg shadow-lg mr-4">
                    <QuizCodeSection />
                </div>
                <div className="w-1/2 p-5 border border-gray-300 rounded-lg shadow-lg ml-16">
                    <LoginSection />
                </div>
            </div>
        </div>
    );
};

export default Homepage;
