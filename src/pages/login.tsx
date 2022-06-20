import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../widgets/forms/login-form';
import { useSelector } from '../services/hooks';
import { jwt } from '../services/api';

const Page = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 40px 0 40px 0;
  position: relative;
  z-index: 10;

  @media screen and (max-width: 600px) {
    box-sizing: border-box;
    padding: 0 20px 0 20px;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const isLogged = useSelector(
    (state) => state.system.isLoggedIn
        && !!state.profile.username,
  )
    && jwt.test();

  useEffect(() => {
    if (isLogged) {
      navigate('/');
    }
  }, [isLogged, navigate]);
  return (
    <Page>
      <LoginForm />
    </Page>
  );
};

export default Login;
