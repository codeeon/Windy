import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Switcher, Error, Input, Form, Title, Wrapper } from '../components/SC/SC.Auth';
import GithubLogin from '../components/GithubLogin';

// const errors = {
//   'auth/email-already-in-use': '이미 존재하는 이메일입니다.',
// };

const Login = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (isLoading || email === '' || password === '') return;

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (e) {
      // 에러 핸들링 - 비밀번호가 유효하지 않거나, 이미 계정이 존재하는 경우
      if (e instanceof FirebaseError) {
        // console.log('에러 코드 -> ', e.code, ', 에러 메시지 ->', e.message);
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>🍃 Windy 🪽</Title>
      <Form onSubmit={onSubmit}>
        <Input onChange={onChange} name='email' placeholder='이메일' type='text' />
        <Input onChange={onChange} name='password' placeholder='비밀번호' type='password' />
        <Input type='submit' value={isLoading ? '로딩 중...' : '로그인'} />
      </Form>
      {error !== '' && <Error>{error}</Error>}
      <Switcher>
        아직 회원이 아니신가요? <Link to='/signup'>회원가입 &rarr;</Link>
      </Switcher>
      <GithubLogin />
    </Wrapper>
  );
};

export default Login;
