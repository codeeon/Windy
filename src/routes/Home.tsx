import React from 'react';
import PostForm from '../components/PostForm';
import { styled } from 'styled-components';

const Home = () => {
  return (
    <Wrapper>
      <PostForm />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div``;
