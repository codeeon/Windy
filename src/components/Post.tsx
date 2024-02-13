import React from 'react';
import { IPost } from './Timeline';
import styled from 'styled-components';
import { auth, db, storage } from '../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

const Post = ({ id, photo, post, userId, username }: Partial<IPost>) => {
  const user = auth.currentUser;

  const onDelete = async () => {
    const ok = confirm('정말 삭제하시겠습니까?');

    if (!ok || user?.uid !== userId) return;

    try {
      await deleteDoc(doc(db, 'posts', id));
      if (photo) {
        const photoRef = ref(storage, `posts/${user?.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (error) {
      console.log(error);
    } finally {
      //
    }
  };

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{post}</Payload>
        {user?.uid === userId && <DeleteButton onClick={onDelete}>삭제하기</DeleteButton>}
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

const DeleteButton = styled.button`
  width: 70px;
  height: 25px;
  background-color: ${({ theme }) => theme.color.warn};
  color: ${({ theme }) => theme.color.text3};
  font-weight: 600;
  border: none;
  border-radius: 5px;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  cursor: pointer;
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;
