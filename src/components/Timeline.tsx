import {
  Unsubscribe,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { db } from '../../firebase';
import Post from './Post';

// real-time connection

export interface IPost {
  id: string;
  createdAt: number;
  photo: string;
  post: string;
  userId: string;
  username: string;
}

const Timeline = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    const fetchPosts = async () => {
      const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(20));

      // const snapshot = await getDocs(postsQuery);
      // // snapshot.docs.forEach((doc) => console.log(doc.exists(), doc.data()));
      // const posts = snapshot.docs.map((doc) => {
      //   const { createdAt, photo, post, userId, username } = doc.data();
      //   return { createdAt, photo, post, userId, username, id: doc.id };
      // });

      // 변경 사항 실시간 refetching - onSnapShot이 반환하는 Unsubscribe를 활용해서, 벗어나면 사용을 멈춰야 사용량이 멈춤
      unsubscribe = await onSnapshot(postsQuery, (snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          const { createdAt, photo, post, userId, username } = doc.data();
          return { createdAt, photo, post, userId, username, id: doc.id };
        });
        setPosts(posts);
      });
    };

    fetchPosts();

    return () => {
      unsubscribe && unsubscribe();
    };
    // useEffect의 teardown함수를 활용한 clean up
  }, []);

  return (
    <Wrapper>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </Wrapper>
  );
};

export default Timeline;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;
