import { types } from "../types/types";
import {fetchConToken} from "../helpers/fetch";
import {prepareEvents} from "../helpers/prepareEvents";
import Swal from "sweetalert2";


export const eventStartAddNew = ( event ) => {
    return async( dispatch, getState ) => {

        const {uid, name} = getState().auth;

        try{
            const resp = await fetchConToken('events', event, "POST");
            const body = await resp.json();

            if( body.ok ){
                //al evento en en el frontent le hace falta el id y el name x lo q el id lo cojemos del body y id
                // del usuario y el name d redux
                event.id = body.saveEvent.id;
                event.user = {
                    _id: uid ,
                    name: name
                }

                dispatch(eventAddNew(event));
            }
        }catch (error){
            console.log(error);
        }

    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearactiveEvents = () => ({ type: types.eventClearactiveEvents });

export const eventStartUpdate = ( event ) => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken(`events/${ event.id }`, event, 'PUT' );
            const body = await resp.json();

            console.log(event.id)

            if ( body.ok ) {
                dispatch( eventUpdated( event ) );
            } else {
                Swal.fire('Error', body.sms, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}

const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventStartDelete = () => {
    return async ( dispatch, getState ) => {

        const { id } = getState().calendar.activeEvents;
        try {
            const resp = await fetchConToken(`events/${ id }`, {}, 'DELETE' );
            const body = await resp.json();

            console.log(body)

            if ( body.ok ) {
                dispatch( eventDeleted() );
            } else {
                Swal.fire('Error', body.sms, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}

const eventDeleted = () => ({ type: types.eventDeleted });

export const eventStartLoading = () => {
    return async(dispatch) => {

        try {

            const resp = await fetchConToken( 'events' );
            const body = await resp.json();

            const events = prepareEvents( body.event );

            console.log(body.event)

            dispatch(eventLoaded(events));

        } catch (error) {
            console.log(error)
        }

    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})



