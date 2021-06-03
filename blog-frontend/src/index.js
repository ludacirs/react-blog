import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import './index.scss';
import {applyMiddleware, createStore} from "redux";
import rootReducer, {rootSaga} from "./modules";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import {tempSetUser,check} from "./modules/user";
import {HelmetProvider} from "react-helmet-async";

function loadUser(){
    try{
        const user = localStorage.getItem('user');
        if(!user) return;
        store.dispatch(tempSetUser(user));
        store.dispatch(check());
    } catch (e){
        console.log(e);
    }
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
loadUser();


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <HelmetProvider>
            <App />
            </HelmetProvider>
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);