import { combineReducers } from "redux";
import listReducer from './reducers/listReducer'

const allReducers = {
    listReducer
};

export default combineReducers(allReducers);
