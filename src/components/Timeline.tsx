import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { db } from '../../firebase';
import Post from './Post';

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

  const fetchPosts = async () => {
    const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));

    const snapshot = await getDocs(postsQuery);
    // snapshot.docs.forEach((doc) => console.log(doc.exists(), doc.data()));
    const posts = snapshot.docs.map((doc) => {
      const { createdAt, photo, post, userId, username } = doc.data();
      return { createdAt, photo, post, userId, username, id: doc.id };
    });
    setPosts(posts);
  };

  useEffect(() => {
    fetchPosts();
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

const Wrapper = styled.div``;
