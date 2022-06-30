import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../services/hooks';
import { jwt } from '../services/api';
import EditorForm from '../widgets/forms/editor-form';

const Page = styled.section`
  width: 100%;
  margin: 40px 0 40px 0;
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 600px) {
    box-sizing: border-box;
    padding: 0 20px 0 20px;
  }
`;

const Editor = () => {
  const navigate = useNavigate();
  const isLogged = useSelector(
    (state) => state.system.isLoggedIn
      && !!state.profile.username,
  )
    && jwt.test();

  useEffect(() => {
    if (!isLogged) {
      navigate('/login');
    }
  }, [isLogged, navigate]);

  return (
    <Page>
      <EditorForm />
    </Page>
  );
};

export default Editor;
