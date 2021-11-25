import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';

const LoginForm = () => {
  const { loginLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <>
      <FormWrapper onFinish={onSubmitForm}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input type="email" name="user-email" value={email} onChange={onChangeEmail} required />
        </div>

        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input type="password" name="user-password" value={password} onChange={onChangePassword} required />
        </div>

        <ButtonWrapper>
          <Button type="primary" htmlType="submit" loading={loginLoading}>
            로그인
          </Button>
          <Link href="/signup">
            <a>
              <Button>회원가입</Button>
            </a>
          </Link>
        </ButtonWrapper>
      </FormWrapper>
    </>
  );
};

export default LoginForm;

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;
