import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import Head from 'next/head';
import Router from 'next/router';
import { Form, Input, Checkbox, Button } from 'antd';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { SIGN_UP_REQUEST } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';

import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const Signup = () => {
  const dispatch = useDispatch();
  const { signupLoading, signupDone, signupError, me } = useSelector((state) => state.user);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }

    if (!term) {
      return setTermError(true);
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, passwordCheck, term]);

  useEffect(() => {
    if (signupDone) {
      Router.replace('/');
    }
  }, [signupDone]);

  useEffect(() => {
    if (signupError) {
      alert(signupError);
    }
  }, [signupError]);

  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id]);

  return (
    <AppLayout>
      <Head>
        <title>??? ????????? | Bird</title>
      </Head>

      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">?????????</label>
          <br />
          <Input type="email" name="user-email" value={email} required onChange={onChangeEmail} />
        </div>

        <div>
          <label htmlFor="user-nickname">?????????</label>
          <br />
          <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
        </div>

        <div>
          <label htmlFor="user-password">????????????</label>
          <br />
          <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
        </div>

        <div>
          <label htmlFor="user-password-check">??????????????????</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && <ErrorMessage>??????????????? ???????????? ????????????.</ErrorMessage>}
        </div>

        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            ???????????????.
          </Checkbox>
          {termError && <ErrorMessage>????????? ??????????????? ?????????.</ErrorMessage>}
        </div>

        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={signupLoading}>
            ????????????
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';

  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Signup;

const ErrorMessage = styled.div`
  color: red;
`;
