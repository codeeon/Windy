import React from 'react';
import { IPost } from './Timeline';
import styled from 'styled-components';

const Post = ({ photo, post, username }: Partial<IPost>) => {
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{post}</Payload>
      </Column>
      <Column className='align-end'>{photo && <Photo src={photo} alt='' />}</Column>
    </Wrapper>
  );
};

export default Post;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: ${({ theme }) => `1px solid rgba(${theme.color.border2}, 0.5)`};
  border-radius: 15px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  &.align-end {
    align-items: flex-end;
  }
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0;
  font-size: 18px;
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;
