import React, { FC } from 'react';
import styled from 'styled-components';

const PreloaderWrapper = styled.div`
  position: relative;
  width: 100wh;
  height: 60vh;
`;

const Loader = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border: 2px solid #ffc600;
  border-top-color: transparent;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  animation: spin 2.5s linear infinite;

  @keyframes spin {
    0% {
        transform: rotate(0deg);
   }
    100% {
        transform: rotate(360deg);
   }
`;

const Preloader: FC = () => (
  <PreloaderWrapper>
    <Loader />
  </PreloaderWrapper>
);

export default Preloader;
