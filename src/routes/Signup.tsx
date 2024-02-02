import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { Switcher, Error, Input, Form, Title, Wrapper } from '../components/SC/SC.Auth';

// const errors = {
//   'auth/email-already-in-use': '이미 존재하는 이메일입니다.',
// };

const Signup = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'passwordConfirm') {
      setPasswordConfirm(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (isLoading || name === '' || email === '' || password === '' || passwordConfirm === '') return;
    try {
      setIsLoading(true);

      // 계정 생성
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      console.log(credentials.user);

      // 유저 네임 저장
      await updateProfile(credentials.user, { displayName: name });
      console.log(credentials.user);

      // 리다이렉트
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
        <Input onChange={onChange} name='name' placeholder='이름' type='text' />
        <Input onChange={onChange} name='email' placeholder='이메일' type='text' />
        <Input onChange={onChange} name='password' placeholder='비밀번호' type='password' />
        <Input onChange={onChange} name='passwordConfirm' placeholder='비밀번호 확인' type='password' />
        <Input type='submit' value={isLoading ? '로딩 중...' : '가입하기'} />
      </Form>
      {error !== '' && <Error>{error}</Error>}
      <Switcher>
        이미 계정이 있으신가요? <Link to='/login'>로그인 &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
};

export default Signup;
