import moment from 'moment'

//para convertit d string a fecha con moment 
export const prepareEvents = ( events = [] ) => {

    return events.map(
        (e) => ({
            ...e,
            date_end: moment( e.date_end ).toDate(),
            date_start: moment( e.date_start ).toDate(),
        })
    );

}