import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import LoginPage from "../components/auth/LoginPage";
import CalendarPage from "../components/calendar/CalendarPage";
import {useDispatch, useSelector} from "react-redux";
import {startChecking} from "../actions/auth";


const AppRouter = () => {
    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.auth);

    useEffect(() => {

        dispatch( startChecking() );

    }, [dispatch])

    if ( checking ) {
        return (<h5>Espere...</h5>);
    }

    return (
        <Router>
            <Routes>
                <Route path="/login/" element={ !!uid ? (<Navigate to = '/' /> ):(<LoginPage /> )} />
                <Route path="/" element={ !!uid ? (<CalendarPage />):(<Navigate to = '/login' /> )} />

            </Routes>
        </Router>

    );
};

export default AppRouter;