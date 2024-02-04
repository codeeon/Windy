import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../../firebase';
import HomeIcon from '../assets/icons/layout/HomeIcon';
import LogoutIcon from '../assets/icons/layout/LogoutIcon';
import ProfileIcon from '../assets/icons/layout/ProfileIcon';

const Layout = () => {
  const navigate = useNavigate();

  const onLogOut = async () => {
    const ok = confirm('정말 로그아웃 하시겠습니까?');

    if (ok) {
      await auth.signOut();
      navigate('/login');
    }
  };

  return (
    <Wrapper>
      <Menu>
        <Link to='/'>
          <MenuItem>
            <HomeIcon />
          </MenuItem>
        </Link>
        <Link to='/profile'>
          <MenuItem>
            <ProfileIcon />
          </MenuItem>
        </Link>
        <MenuItem onClick={onLogOut} className='log-out'>
          <LogoutIcon />
        </MenuItem>
      </Menu>
      <Outlet />
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 4fr;
  padding: 50px 0;
  width: 100%;
  max-width: 860px;
  height: 100%;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.color.border};
  height: 50px;
  width: 50px;
  border-radius: 50%;
  svg {
    width: 30px;
    fill: ${({ theme }) => theme.color.base};
  }
  &.log-out {
    border-color: ${({ theme }) => theme.color.warn};
    svg {
      fill: ${({ theme }) => theme.color.warn};
    }
  }
  &:hover,
  &:active {
    border: 2px solid ${({ theme }) => theme.color.focus};
  }
`;
