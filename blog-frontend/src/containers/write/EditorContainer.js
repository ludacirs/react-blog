import React, {useCallback, useEffect} from 'react';
import Editor from "../../components/write/Editor";
import {useDispatch, useSelector} from "react-redux";
import {changeField,initialize} from "../../modules/write";

const EditorContainer = () => {
    const {title, body} = useSelector(({write})=>({
        title : write.title,
        body: write.body,
    }));
    const dispatch = useDispatch();

    const onChangeField = useCallback(payload=> {
        dispatch(changeField(payload));
    },[dispatch]);

    useEffect(()=>{
        return ()=>{
            dispatch(initialize());
        };
    },[dispatch]);

    return <Editor onChangeField={onChangeField} title={title} body={body}/>;
};

export default EditorContainer;
