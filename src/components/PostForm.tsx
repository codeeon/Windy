import { addDoc, collection, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import styled from 'styled-components';
import { auth, db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const PostForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const onChangePost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      const selectedFile = files[0];
      if (selectedFile.size > 1024 * 1024) {
        alert('업로드할 이미지는 1MB 미만이어야 합니다.');
        e.target.value = '';
        setFile(null);
      } else {
        setFile(selectedFile);
      }
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || post === '' || post.length < 10) return;
    try {
      setIsLoading(true);
      const doc = await addDoc(collection(db, 'posts'), {
        post,
        createdAt: Date.now(),
        username: user.displayName || '익명',
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(storage, `posts/${user.uid}-${user.displayName}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        updateDoc(doc, { photo: url });
      }
      setPost('');
      setFile(null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextArea rows={6} onChange={onChangePost} value={post} placeholder='글을 입력해주세요.' />
      <AttachFileInput onChange={onFileChange} type='file' id='file' accept='image/*' />
      <AttachFileButton htmlFor='file'>{file ? '✔ 업로드 완료' : '이미지 업로드'}</AttachFileButton>
      {/* label의 htmlFor와 id가 일치하면, 해당 label이 id를 가진 요소와 같은 역할을 한다. */}
      {/* input type='file'은 스타일링하기 어렵기 때문에 위와 같은 방법을 택함. */}
      <SubmitButton type='submit' value={isLoading ? '작성 중...' : '작성하기'} />
    </Form>
  );
};

export default PostForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid ${({ theme }) => theme.color.border};
  border-radius: 20px;
  padding: 20px;
  font-size: 16px;
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.bg};
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  &::placeholder {
    font-size: 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
      Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.focus};
  }
`;

const AttachFileInput = styled.input`
  display: none;
`;
const AttachFileButton = styled.label`
  cursor: pointer;
  padding: 10px 0;
  color: ${({ theme }) => theme.color.btn4};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.color.btn4};
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
  &:hover,
  &:active {
    opacity: 0.8;
  }
`;

const SubmitButton = styled.input`
  cursor: pointer;
  background-color: ${({ theme }) => theme.color.btn};
  color: ${({ theme }) => theme.color.text};
  border: none;
  padding: 10px 0;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  &:hover,
  &:active {
    opacity: 0.8;
  }
`;
