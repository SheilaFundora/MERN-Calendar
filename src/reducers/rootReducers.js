import { combineReducers } from 'redux';
import {uiReducer} from "./uiReducers";
import {calendarReducers} from "./calendarReducers";
import {authReducer} from "./authReducer";


//combinacion de todos los reducers, como tenemos varios reducers y al estar solo se le puede pasar uno,
// los convinamos todos en uno

export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducers,
    auth: authReducer

})

