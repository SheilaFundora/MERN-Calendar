import React from 'react';
import { uiOpenModal } from '../../actions/ui';
import {useDispatch} from "react-redux";

export const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch( uiOpenModal() );
    }


    return (
        <button
            className="btn btn-primary fab"
            onClick={ handleOpenModal }
        >+</button>
    )
}
