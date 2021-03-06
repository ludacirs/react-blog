import React, {useEffect, useState} from 'react';
import AuthForm from "../../components/auth/AuthForm";
import {useDispatch, useSelector} from "react-redux";
import {changeField, initializeForm, register} from "../../modules/auth";
import {check} from "../../modules/user";
import {withRouter} from "react-router-dom";

const RegisterForm = ({history}) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const {form, auth, authError, user} = useSelector(({auth,user}) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));

    const onChange = (e)=>{
        const {value, name} = e.target;
        dispatch(changeField({form: 'register', key: name, value}));
    };

    const onSubmit = (e)=>{
        e.preventDefault();
        const {username, password, passwordConfirm} = form;

        if([username,password,passwordConfirm].includes('')){
            setError('빈 칸을 모두 입력하세요');
            return ;
        }
        if(username.length<=3){
            setError('아이디가 너무 짧습니다');
            return ;
        }
        if(password!==passwordConfirm){
            setError('비밀번호가 일치하지 않습니다');
            return ;
        }
        dispatch(register({username, password}));
    };

    useEffect(()=>{
        dispatch(initializeForm('register'));
    },[dispatch]);

    useEffect(()=>{
        if(authError){
            if(authError){
                if(authError.response.status === 409){
                    setError('이미 존재하는 계정입니다');
                    return ;
                }
                setError('회원가입 실패');
            }
        }

        if(auth) {
            console.group('success');
            console.log(auth);
            console.groupEnd();
            dispatch(check());
        }
    }, [auth, authError, dispatch]);
    useEffect(()=>{
        if(user) {
            history.push('/');
            try{
                localStorage.setItem('user',JSON.stringify(user));
            }catch (e){
                console.log('localStorage is not working');
            }
        }
    },[history,user]);
    return (
        <AuthForm
            type={'register'}
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(RegisterForm);
