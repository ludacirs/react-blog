import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import {createAction, handleActions} from "redux-actions";
import * as authAPI from '../lib/api/auth';
import {takeLatest, call} from 'redux-saga/effects';

const TEMP_SET_USER = 'user/TEMP_SET_USER';
const LOGOUT = 'user/LOGOUT';
const [CHECK,CHECK_SUCCESS,CHECK_FAILURE] = createRequestActionTypes('user/CHECK');
export const tempSetUser = createAction(
    TEMP_SET_USER,
    user => user
);
function checkFailureSaga(){
    try{
        localStorage.removeItem('user');
    } catch (e){
        console.log(e);
    }
}
function* userLogoutSaga(){
    try{
        yield call(authAPI.logout);
        localStorage.removeItem('user');
    }catch (e){
        console.log(e);
    }
}

export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);
const checkSaga = createRequestSaga(CHECK,authAPI.check);

export function* userSaga() {
    yield takeLatest(CHECK, checkSaga);
    yield takeLatest(CHECK_FAILURE, checkFailureSaga);
    yield takeLatest(LOGOUT, userLogoutSaga);
}

const initialState = {
    user : null,
    checkError : null,
}

const reducer= handleActions(
    {
        [TEMP_SET_USER] : (state, {payload: user})=>({
            ...state,
            user
        }),
        [CHECK_SUCCESS] : (state, {payload: user})=>({
            ...state,
            user,
            checkError: null,
        }),
        [CHECK_FAILURE] : (state, {payload: error})=>({
            ...state,
            user: null,
            checkError : error,
        }),
        [LOGOUT] : (state) => ({
            ...state,
            user: null,
        })
    },initialState
)

export default reducer;
