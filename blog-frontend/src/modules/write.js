import {createAction, handleActions} from "redux-actions";
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import * as postsAPI  from '../lib/api/post'
import {takeLatest} from 'redux-saga/effects';

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';
const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] = createRequestActionTypes('write/WRITE_POST');
const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';
const [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE] = createRequestActionTypes('write/UPDATE_POST');

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({key, value}) =>({key,value}));
export const writePost = createAction(WRITE_POST, ({title,body,tags})=>({title, body, tags}));
export const setOriginalPost = createAction(SET_ORIGINAL_POST,post=>post);
export const updatePost = createAction(UPDATE_POST,({id, body, title, tags}) => ({id, body, title, tags}));

const writePostSaga = createRequestSaga(WRITE_POST, postsAPI.writePost);
const updatePostSaga = createRequestSaga(UPDATE_POST, postsAPI.updatePost);

export function* writeSaga(){
    yield takeLatest(WRITE_POST, writePostSaga);
    yield takeLatest(UPDATE_POST, updatePostSaga);
}

const initialState = {
    title : '',
    body : '',
    tags: ['태그를','클릭하면','삭제됩니다'],
    post: null,
    postError : null,
    originalPostId: null,
};

const reducer = handleActions(
    {
        [INITIALIZE] : () => ({
            ...initialState,
        }),
        [CHANGE_FIELD] : (state,{payload: {key, value}}) =>({
            ...state,
            [key]: value,
        }),
        [WRITE_POST]: (state)=>({
            ...state,
            post: null,
            postError: null
        }),
        [WRITE_POST_SUCCESS]: (state,{payload: post}) =>({
            ...state,
            post
        }),
        [WRITE_POST_FAILURE]: (state,{payload: error}) =>({
            ...state,
            error
        }),
        [SET_ORIGINAL_POST]: (state,{payload: post}) =>({
            ...state,
            title: post.title,
            body: post.body,
            tags: post.tags,
            originalPostId: post._id,
        }),
        [UPDATE_POST_SUCCESS]: (state,{payload: post}) =>({
            ...state,
            post,
        }),
        [UPDATE_POST_FAILURE]: (state,{payload: error}) =>({
            ...state,
            error
        })
    }
    , initialState
);
export default reducer;