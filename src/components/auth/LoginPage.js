import React from 'react';
import './login.css';
import {useForm} from "../../hooks/useForm";
import {useDispatch} from "react-redux";
import {startRegister, stratLogin} from "../../actions/auth";
import Swal from "sweetalert2";


const LoginPage = () => {

    const dispatch = useDispatch();


    const [ formLoginValues, handleInputChange ] = useForm({
        lEmail: 'shey@gamil.com',
        lPassword: 'asdasd'
    });

    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        rName: '',
        rEmail: '',
        rPassword1: '',
        rPassword2: ''
    });

    const { lEmail, lPassword } = formLoginValues;
    const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;


    const handleLogin = (e) => {
        e.preventDefault();

        dispatch( stratLogin(lEmail, lPassword))

    }

    const handleRegister = ( e ) => {
        e.preventDefault();

        if ( rPassword1 !== rPassword2 ) {
            return Swal.fire('Error', 'Las contraseñas deben de ser iguales','error');
        }
        console.log('?')
        dispatch( startRegister( rEmail, rPassword1, rName ) );
    }
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group mb-4">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={lEmail}
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="form-group mb-4">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={lPassword}
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Nombre"
                                name="rName"
                                value={ rName }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control mb-3"
                                placeholder="Correo"
                                name="rEmail"
                                value={ rEmail }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="Contraseña"
                                name="rPassword1"
                                value={ rPassword1 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="Repita la contraseña"
                                name="rPassword2"
                                value={ rPassword2 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit mb-3"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;