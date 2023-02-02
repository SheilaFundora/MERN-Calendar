import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import moment from "moment";
import DateTimePicker from 'react-datetime-picker';
import {useDispatch, useSelector} from "react-redux";

import {uiCloseModal} from "../../actions/ui";
import {eventClearactiveEvents, eventStartAddNew, eventStartUpdate} from "../../actions/events";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    date_start: now.toDate(),
    date_end: nowPlus1.toDate()
}

const CalendarModal = () => {

    const [formValues, setFormValues] = useState(initEvent);
    const {note, title, date_start, date_end} = formValues;
    const [ dateStart, setDateStart ] = useState( now.toDate() );
    const [ dateEnd, setDateEnd ] = useState( nowPlus1.toDate() );
    const [ titleValid, setTitleValid ] = useState(true);
    const {modalOpen} = useSelector(state => state.ui) //asi m quedo con lo q esta el store ui
    const { activeEvents } = useSelector( state => state.calendar );
    const dispatch = useDispatch();

    useEffect(() => {
        if ( activeEvents ) {
            setFormValues( activeEvents );
        } else {
            setFormValues( initEvent );
        }
    }, [activeEvents, setFormValues])


    const closeModal = () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        dispatch(eventClearactiveEvents());
        setFormValues(initEvent);
        dispatch( uiCloseModal() );
    }

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const handleStartDateChange = ( e ) => {
        setDateStart( e );
        setFormValues({
            ...formValues,
            date_start: e
        })
    }

    const handleEndDateChange = ( e ) => {
        setDateEnd( e );
        setFormValues({
            ...formValues,
            date_end: e
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment( date_start );
        const momentEnd = moment( date_end );

        if ( momentStart.isSameOrAfter( momentEnd ) ) { //si la fecha d inicio es igual o esta despues d la final
            // return Swal.fire('Error','La fecha fin debe de ser mayor a la fecha de inicio', 'error');
        }
        if ( title.trim().length < 2 ) {
            return setTitleValid(false);
        }

        if ( activeEvents ) {
            dispatch( eventStartUpdate( formValues ) )
        } else {
            dispatch( eventStartAddNew(formValues) );
        }


        setTitleValid(true);
        closeModal();
    }

    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMs = {200}
        >

            <h1>  {( activeEvents ) ? 'Editar Evento': 'Nuevo evento'} </h1>
            <hr />
            <form className="container"  onSubmit={ handleSubmitForm }>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ dateStart }
                        className="form-control"
                    />
                </div>

                <div className="form-group mb-2 mt-3">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        value={ dateEnd }
                        minDate={ dateStart }
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group mb-2 mt-1">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={ `form-control ${ !titleValid && 'is-invalid' } `}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group mb-2 mt-3">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={note}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    );
};

export default CalendarModal;