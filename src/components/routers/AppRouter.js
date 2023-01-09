import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import LoginPage from "../auth/LoginPage";
import CalendarPage from "../calendar/CalendarPage";


const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={ <LoginPage /> } />
                <Route path="/" element={ <CalendarPage />} />
                <Route exact render={() => <Navigate to="/" />} />

            </Routes>
        </Router>

    );
};

export default AppRouter;