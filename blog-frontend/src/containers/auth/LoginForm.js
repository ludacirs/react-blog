import React, {useEffect, useState} from 'react';
import AuthForm from "../../components/auth/AuthForm";
import {useDispatch, useSelector} from "react-redux";
import {changeField, initializeForm, login} from "../../modules/auth";
import {check} from "../../modules/user";
import {withRouter} from "react-router-dom";

const LoginForm = ({history}) => {
    const [error,setError] = useState(null);
    const dispatch = useDispatch();
    const {form, auth, authError, user} = useSelector(({auth,user}) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));
    const onChange = e=>{
        const {value,name} = e.target;
        dispatch(changeField({form: 'login', key: name, value}));
    };
    const onSubmit = e=>{
        e.preventDefault();
        dispatch(login(form));
    };

    useEffect(()=>{
        dispatch(initializeForm('login'));
    },[dispatch]);

    useEffect(()=>{
        if(authError){
            console.group('error');
            console.log(authError);
            console.groupEnd();
            setError('로그인 실패');
        }

        if(auth) {
            console.group('success');
            console.log(auth);
            console.groupEnd();
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    useEffect(()=>{
        if(user){
            history.push('/');
            try{
                localStorage.setItem('user',JSON.stringify(user));
            } catch (e){
                console.log('localStorage is not working');
            }
        }
    },[history, user])


    return (
        <AuthForm
            type={'login'}
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />

    );
};

export default withRouter(LoginForm);
