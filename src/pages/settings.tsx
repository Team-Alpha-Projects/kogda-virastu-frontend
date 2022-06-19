import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SettingsForm from '../widgets/forms/settings-form';
import { useSelector } from '../services/hooks';
import { jwt } from '../services/api';

const Page = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 600px) {
    box-sizing: border-box;
    padding: 0 20px 0 20px;
  }
`;

const Settings = () => {
  const navigate = useNavigate();
  const isLogged = useSelector(
    (state) => state.system.isLoggedIn
        && !!state.profile.username,
  )
    && jwt.test();

  React.useEffect(() => {
    if (!isLogged) {
      navigate('/login');
    }
  }, [isLogged, navigate]);

  return (
    <Page>
      <SettingsForm />
    </Page>
  );
};

export default Settings;
