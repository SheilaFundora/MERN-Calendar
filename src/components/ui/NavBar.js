import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {startLogout} from "../../actions/auth";

const NavBar = () => {
    const dispatch = useDispatch();
    const {name} = useSelector( state => state.auth);

    const handleLogout = () => {
        dispatch( startLogout() );
    }

    return (
        <nav className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand mx-5">
                {name}
            </span>

            <button className="btn btn-outline-danger mx-5" onClick={ handleLogout }>
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir</span>
            </button>


        </nav>
    );
};

export default NavBar;