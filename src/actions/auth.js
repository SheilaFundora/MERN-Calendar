import {fetchConToken, fetchSinToken} from "../helpers/fetch";
import {types} from "../types/types";
import Swal from "sweetalert2"


export const stratLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('auth', {email, password}, "POST"); //el fetch retorna
        // una respuesta por lo q utilizamos el await y la funcion tendra q ser async
        const body = await resp.json();//lo converitmos para aceedera la informacion

        if (body.ok) {
            localStorage.setItem('token', body.token); //grabaremos el token en el local storage
            localStorage.setItem('token-init-date', new Date().getTime()); //grabaremos la fecha completa del token
            //en el local storage,la fecha en q se crea


            //ya lo tenemos todoo de nuestro backend ahora tenemos q hacer el dispatch de nuestra accion
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))

        } else {
            Swal.fire('Error', body.sms, 'error')
        }


    }
}

export const startRegister = ( email, password, name ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth/new', { email, password, name }, 'POST' );
        const body = await resp.json();

        console.log(body);

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )

            Swal.fire('Exito', "Se ha registrado con existo", 'success');

        } else {
            Swal.fire('Error', body.sms, 'error');
        }


    }
}

export const startChecking = () => {
    return async(dispatch) => {

        const resp = await fetchConToken( 'auth/renew' );
        const body = await resp.json();

        console.log(resp);

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            dispatch( checkingFinish() );
        }
    }
}

export const startLogout = () => {
    return ( dispatch ) => {

        localStorage.clear();
        dispatch( logout() );
    }
}

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

const checkingFinish = () => ({ type: types.authCheckingFinish });

const logout = () => ({ type: types.authLogout })

