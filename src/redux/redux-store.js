import { combineReducers, createStore } from 'redux';
import mainPageReducer from './main-page-reducer';

let reducers = combineReducers({
    mainPage: mainPageReducer
});

let store = createStore(reducers);

export default store;