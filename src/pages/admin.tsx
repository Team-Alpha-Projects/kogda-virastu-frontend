import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from '../services/hooks';
import { jwt } from '../services/api';
import { getUsersThunk } from '../thunks';
import { UserList } from '../widgets';

const Page = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 40px 0 40px 0;
  position: relative;
  z-index: 10;
`;

const Admin: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const intl = useIntl();
  const isLogged = useSelector(
    (state) => state.system.isLoggedIn
      && !!state.profile.username,
  )
    && jwt.test();
  const { roles } = useSelector((state) => state.profile);
  const { users } = useSelector((state) => state.all);

  useEffect(() => {
    if (!isLogged) navigate('/login');
    if (!roles?.includes('admin')) navigate('/');
  }, [roles, isLogged, navigate]);

  useEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  return (
    <Page>
      <UserList users={users} title={intl.messages.userList as string} />
    </Page>
  );
};

export default Admin;
