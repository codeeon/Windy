import React from 'react';
import PostForm from '../components/PostForm';
import { styled } from 'styled-components';
import Timeline from '../components/Timeline';

const Home = () => {
  return (
    <Wrapper>
      <PostForm />
      <Timeline />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  overflow-y: scroll;
  grid-template-rows: 1fr 5fr;
`;
