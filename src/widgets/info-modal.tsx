import React, { useMemo, FC } from 'react';
import styled, { useTheme, css } from 'styled-components';

import ReactDOM from 'react-dom';
import { RegularText } from '../ui-lib';

interface IProps {
  message?: string;
  isTagFollowing?: boolean;
  isTagUnFollowing?: boolean;
  isInviteCopying?: boolean;
  isSettingsUpdateSucceeded?: boolean;
  onClick?: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  z-index: 95;
`;

const ModalDialog = styled.div<IProps>`
  position: relative;
  width: 267px;
  height: 32px;
  z-index: 97;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 30px 0;
  background-color: black;
  opacity: 0;
  transition: opacity 500ms linear;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08), 0 0 4px rgba(0, 0, 0, 0.08),
    0 0 1px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  @media screen and (max-width: 420px) {
    width: 200px;
  }

  ${({ isTagFollowing }) => isTagFollowing
    && css` opacity: 1;
    transition: opacity 500ms linear;
    `}
  ${({ isTagUnFollowing }) => isTagUnFollowing
    && css`
      opacity: 1;
      transition: opacity 500ms linear;
    `}
  ${({ isSettingsUpdateSucceeded }) => isSettingsUpdateSucceeded
    && css`
      opacity: 1;
      transition: opacity 500ms linear;
    `}
  ${({ isInviteCopying }) => isInviteCopying
    && css`
      opacity: 1;
      transition: opacity 500ms linear;
    `}
`;

const InfoModal: FC<IProps> = ({
  message,
  isTagFollowing,
  isTagUnFollowing,
  isSettingsUpdateSucceeded,
  isInviteCopying,
}) => {
  const theme = useTheme();
  const portalRoot = useMemo(
    () => document.getElementById('modal'),
    [],
  ) as Element;

  return ReactDOM.createPortal(
    <ModalOverlay>
      <ModalDialog
        isTagFollowing={isTagFollowing}
        isInviteCopying={isInviteCopying}
        isTagUnFollowing={isTagUnFollowing}
        isSettingsUpdateSucceeded={isSettingsUpdateSucceeded}>
        <RegularText
          size='large'
          weight={400}
          sansSerif
          color={theme.bgPrimary}>
          {message}
        </RegularText>
      </ModalDialog>
    </ModalOverlay>,
    portalRoot,
  );
};

export default InfoModal;
