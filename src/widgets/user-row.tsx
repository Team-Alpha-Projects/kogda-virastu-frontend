import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from '../services/hooks';
import { AvatarIcon, Divider } from '../ui-lib';
import { TAPIUser } from '../services/api.types';
import { patchRolesThunk, getUsersThunk } from '../thunks';

interface IUserRow {
  user: TAPIUser;
}

const Row = styled.li`
  list-style-type: none;
  display: flex;
  flex-flow: row nowrap;

  @media screen and (max-width: 320px) {
    flex-flow: column;
  }
`;

const AvatarUsernameCont = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 280px;
  gap: 8px;

  @media screen and (max-width: 320px) {
    margin-bottom: 16px;
  }
`;

const UserName = styled.p`
  color: ${({ theme }) => theme.secondaryText};
  font-family: ${({ theme: { text16Sans: { family } } }) => family};
  font-size: ${({ theme: { text16Sans: { size } } }) => size}px;
  font-weight: ${({ theme: { text16Sans: { weight } } }) => weight};
  line-height: ${({ theme: { text16Sans: { height } } }) => height}px;
  display: flex;
  align-items: center;
  margin: 0 4px 0 0;
`;

const RoleText = styled(UserName)`
  width: 200px;

  @media screen and (max-width: 320px) {
    margin-left: 56px;
  }
`;

const CheckWithLabelContainer = styled.label`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0px;
  gap: 8px;
  width: 160px;

  @media screen and (max-width: 320px) {
    margin: 26px 0 0 28px;
  }
`;

const Input = styled.input`
  height: 20px;
  width: 20px;

  &:checked {
    accent-color: #62626A;
  } 
`;

const UserRow: FC<IUserRow> = ({ user }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState<boolean>(false);
  const id: string = nanoid();

  useEffect(() => {
    if (user.roles.includes('admin')) setChecked(true);
  }, [user.roles]);

  const toggle = () => {
    dispatch(patchRolesThunk(user));
    setChecked(!checked);
    setTimeout(() => {
      dispatch(getUsersThunk());
    }, 300);
  };

  return (
    <>
      <Row>
        <AvatarUsernameCont>
          <AvatarIcon name={user.nickname} image={user.image} size='medium' distance={8} />
          <UserName>{user.nickname}</UserName>
        </AvatarUsernameCont>
        <RoleText>{user.roles.includes('admin') ? 'Админ' : 'Пользователь'}</RoleText>
        <CheckWithLabelContainer htmlFor={id}>
          <Input id={id} checked={checked} type='checkbox' onChange={() => toggle()} />
          <UserName>Сделать админом</UserName>
        </CheckWithLabelContainer>
      </Row>
      <Divider distance={8} />
    </>
  );
};

export default UserRow;
