import React from 'react';

//recibe el evento
//componente que muestra el evento en el calendario, los campos que ponemos aqui son los q se muestrab
const CalendarEvent = ( {event} ) => {

    const {title, user} = event; //destructurizamos el titulo y el nombre del evento
    
    return (
        <div>
            <strong>{user.name}</strong>
            <span>-{title}</span>
        </div>
    );
};

export default CalendarEvent;