import { styled } from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0px;
`;

export const Title = styled.h1`
  font-size: 42px;
  color: ${({ theme }) => theme.color.base};
`;

export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 12px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type='submit'] {
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.btn};
    color: ${({ theme }) => theme.color.text};
    font-weight: 600;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Error = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.color.warn};
`;

export const Switcher = styled.span`
  margin-top: 20px;
  color: ${({ theme }) => theme.color.sub2};
  a {
    color: ${({ theme }) => theme.color.link};
  }
`;
