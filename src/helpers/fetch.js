const baseUrl = process.env.REACT_APP_API_URL;

//el fetch personalizado va a recibir el endopiont q es la ruta en este caso auth, los datos q va a mandar
// y el metodo q si no manda ninguno sera GET x defecto
export const fetchSinToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`; //la url q se forma es http://localhost:4000/api/auth, este el ultimo es el endpoint

    if ( method === 'GET' ) {
        return fetch( url ); //si es un get mandamos la url normal y retornamos
    } else {
        //si no mandamos q metodo es y llamamos al fetch q resivira siempre la url y en este caso tenemos
        // q configurar el objeto q vamos a mandar
        return fetch( url, {
            method, //mandamos el metodo
            headers: { //configuracion de como mandaremos el contenidp
                'Content-type': 'application/json'//le especificamos el formato
            },
            body: JSON.stringify( data ) //anexar el body al contenido q queremos mandar conevrtido en
            // SON xq es el formato q queremos
        });
    }
}

export const fetchConToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;
    const token = localStorage.getItem('token') || ''; //recibiendo el token del localStorage

    if ( method === 'GET' ) {
        return fetch( url, {
            method,
            headers: {
                'x-token': token //mandando el token en los headers
            }
        });
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        });
    }
}
