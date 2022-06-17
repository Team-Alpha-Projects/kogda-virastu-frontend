import React, { FC } from 'react';
import styled from 'styled-components';
import { nanoid } from '@reduxjs/toolkit';
import { TAPIUsers } from '../services/api.types';
import UserRow from './user-row';

interface IUserList {
  users: TAPIUsers;
  title: string;
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 720px;
  width: 100%;
  gap: 40px;
  margin-top: 16px;

  @media screen and (max-width: 320px) {
    width: 280px;
  }
`;

const ListTitle = styled.h2`
  width:100%;
  margin: 0;
  font-size: ${({ theme: { secondLevelHeading: { size } } }) => `${size}px`} ;
  font-family: ${({ theme: { secondLevelHeading: { family } } }) => family};
  line-height: ${({ theme: { secondLevelHeading: { height } } }) => `${height}px`} ;
  font-weight: ${({ theme: { secondLevelHeading: { weight } } }) => weight};
  color: ${({ theme: { primaryText } }) => primaryText};
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: ${({ theme: { secondLevelHeadingMobile: { size } } }) => `${size}px`} ;
    font-family: ${({ theme: { secondLevelHeadingMobile: { family } } }) => family};
    line-height: ${({ theme: { secondLevelHeadingMobile: { height } } }) => `${height}px`} ;
    font-weight: ${({ theme: { secondLevelHeadingMobile: { weight } } }) => weight};
  }
`;

const UserRows = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  max-height: 55vh;
  overflow-y: auto;
  padding-left: 0;
  margin: 0;
  margin-bottom: -100px;
  gap: 8px;
`;

const UserList: FC<IUserList> = ({ users, title }) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    <UserRows>
      {users && users.map((user) => (
        <UserRow key={nanoid()} user={user} />
      ))}
    </UserRows>
  </ListContainer>
);

export default UserList;
