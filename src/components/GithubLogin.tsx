import { GithubAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import React from 'react';
import { styled } from 'styled-components';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const GithubLogin = () => {
  const navigate = useNavigate();

  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      //   await signInWithPopup(auth, provider);
      await signInWithRedirect(auth, provider);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button onClick={onClick}>
      <Logo src='/assets/logos/github.svg' alt='' /> 깃허브 로그인
    </Button>
  );
};

export default GithubLogin;

const Button = styled.span`
  width: 100%;
  background-color: ${({ theme }) => theme.color.btn2};
  color: ${({ theme }) => theme.color.text2};
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 12px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-top: 50px;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 25px;
`;
