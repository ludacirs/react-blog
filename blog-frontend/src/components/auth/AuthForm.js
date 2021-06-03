import styled from "styled-components";
import React from 'react';
import palette from "../../lib/styles/palette";
import Button from "../common/Button";
import {Link} from "react-router-dom";

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`

const AuthFormBlock = styled.div`
  h3 {
    margin: 0 0 1rem;
    color: ${palette.gray[8]};
  }
`;
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  & :focus {
    color: ${palette.cyan[5]};
    border-bottom: 1px solid ${palette.gray[7]};
  }
  &+& {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover{
      color: ${palette.gray[9]};
    }
  }
`;

const textMap = {
    login : '로그인',
    register : '회원가입'
};

const AuthForm = ({type, form, onChange, onSubmit, error}) => {
    const text = textMap[type];

    return (
        <AuthFormBlock>
            <h3>{text}</h3>
            <form onSubmit={onSubmit}>
                <StyledInput
                    onChange={onChange}
                    value={form.username}
                    autoComplete={'username'}
                    name={'username'}
                    placeholder={'아이디'}/>
                <StyledInput
                    onChange={onChange}
                    value={form.password}
                    autoComplete={'new-password'}
                    name={'password'}
                    placeholder={'비밀번호'}
                    type={'password'}
                />
                {type==='register' && (
                    <StyledInput
                        onChange={onChange}
                        value={form.passwordConfirm}
                        autoComplete={'new-password'}
                        name={'passwordConfirm'}
                        placeholder={'비밀번호 확인'}
                        type={'password'}
                    />
                )}
                <ButtonWithMarginTop cyan fullWidth>
                    {text}
                </ButtonWithMarginTop>
            </form>
            {error && <ErrorMessage>{error}!</ErrorMessage>}
            <Footer>
                {type ==='login' ? <Link to={'/register'}>회원가입</Link> :
                                    <Link to={'/login'}>로그인</Link>}
            </Footer>
        </AuthFormBlock>
    );
};

export default AuthForm;
