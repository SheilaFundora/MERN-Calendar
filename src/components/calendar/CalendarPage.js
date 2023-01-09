import React, {useState} from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es'
import NavBar from "../ui/NavBar";
import {messages} from "../../helpers/calendar-message-en";
import CalendarEvent from "./CalendarEvent";
import CalendarModal from "./CalendarModal";
import {useDispatch, useSelector} from "react-redux";
import {uiOpenModal} from "../../actions/ui";
import {eventClearactiveEvents, eventSetActive} from "../../actions/events";
import {AddNewFab} from "../ui/AddNewFab";
import {DeleteEventFab} from "../ui/DeleteEventFab";

//para cambiar el idioma a espanol
moment.locale('es')
const localizer = momentLocalizer(moment);


const CalendarPage = () => {

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );
    const dispatch = useDispatch();
    const {events, activeEvents} = useSelector(state => state.calendar) //asi m quedo con lo q esta el store del calendar

    //eventos para seleccionar, doble click
    const onDoubleClick = (e) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        dispatch( uiOpenModal() )
    }
    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e))
    }
    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }
    //para ovar cuanlquier dia, con este metodo modemos hacer q aparesca el modal al tocar ciero dia y
    // la fecha sale x decfecto MUY UTIL
    const onSelectSlot = (e) => {
        // dispatch( uiOpenModal() );
        dispatch(eventClearactiveEvents())
    }

    //style of events
    const eventStyleGetter = ( event, start, end, isSelected ) => {
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }


        return {
            style
        }
    };

    return (
        <div className='calendar-screen'>
            <NavBar/>

            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages = { messages } //para cambiar el idioma de lo que esta ahi a espannol
                eventPropGetter={ eventStyleGetter }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                //Creamos un componente aparte para el estilo de los eventos en el calendario,
                // para mostrar lo q quermos, y lo hacems asi
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                view={lastView} //esto especifica q vista queremos cargar, el mes, el dia, agenda..
            />

            <AddNewFab />

            {
                ( activeEvents ) && <DeleteEventFab />
            }

            <CalendarModal />
        </div>
    );
};

export default CalendarPage;