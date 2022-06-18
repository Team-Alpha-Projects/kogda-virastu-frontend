import React, {
  useEffect, useMemo, FC, MouseEventHandler,
} from 'react';
import { useIntl } from 'react-intl';
import styled, { useTheme } from 'styled-components';
import ReactDOM from 'react-dom';
import { ConfirmErrorButton, CrossIcon, RegularText } from '../ui-lib';
import { useSelector } from '../services/hooks';
import { mobileBreakpoint, mobileViewModal } from '../constants';
import { TModalProps } from '../types/widgets.types';

const modalStepWidth = (600 - 280) / (mobileViewModal - mobileBreakpoint);
const modalStepHeight = (320 - 342) / (mobileViewModal - mobileBreakpoint);
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  z-index: 95;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  width: 24px;
  height: 24px;
  border: none;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  z-index: 98;
  background-color: transparent;
`;

const ModalDialog = styled.div`
  position: relative;
  width: 600px;
  height: 296px;
  z-index: 97;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 0 30px;
  background-color: ${({ theme }) => theme.bgPrimary};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08), 0 0 4px rgba(0, 0, 0, 0.08),
    0 0 1px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  @media screen and (max-width: ${mobileViewModal}px) {
    width: calc(600px - (${mobileViewModal}px - 100vw) * ${modalStepWidth});
    height: calc(320px - (${mobileViewModal}px - 100vw) * ${modalStepHeight});
  }
`;

const ModalActionsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  && > button {
    width:55px;
    @media screen  and (max-width:725px) {
      width:50px;
    }
  }
`;

const ErrorModal: FC<TModalProps> = ({ onClose, onSubmit }) => {
  const theme = useTheme();
  const intl = useIntl();
  const { errorObject } = useSelector((state) => state.api);
  const portalRoot = useMemo(
    () => document.getElementById('modal'),
    [],
  ) as Element;
  useEffect(() => {
    const handleEscClose = (evt: KeyboardEvent): void => {
      if (evt.key && evt.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [onClose, portalRoot]);
  const onCloseClick: MouseEventHandler = () => onClose();

  let errorMessage = '';
  if (errorObject) {
    if (errorObject.statusCode === 401 && errorObject.url === '/api/articles/feed') errorMessage = `${intl.messages.errorUnathorized as string}`;
    else if (errorObject.statusCode === 401 && errorObject.url === '/api/users/login') errorMessage = `${intl.messages.errorLogin as string}`;
    else if (errorObject.statusCode === 401 && errorObject.url === '/api/admin/users') errorMessage = `${intl.messages.errorUnathorized as string}`;
    else if (errorObject.statusCode === 401 && errorObject.url?.includes('favorite')) errorMessage = `${intl.messages.errorUnathorized as string}`;
    else if (errorObject.statusCode === 401 && errorObject.url?.includes('tags')) errorMessage = `${intl.messages.errorUnathorized as string}`;
    else if (errorObject.statusCode === 403 && errorObject.url === '/api/admin/users') errorMessage = `${intl.messages.errorNotAdmin as string}`;
    else { errorMessage = `${errorObject.message as string}`; }
  }

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onCloseClick}>
      <ModalDialog>
        <CloseButton onClick={onCloseClick}>
          <CrossIcon color={theme.primaryText} />
        </CloseButton>
        <RegularText
          size='large'
          weight={400}
          sansSerif
          color={theme.modalText}
          marginCSS='margin: 104px 0 32px;'
          paddingCSS='max-width: 400px;'>
          {errorMessage}
        </RegularText>
        <ModalActionsContainer>
          <ConfirmErrorButton onClick={onSubmit} />
        </ModalActionsContainer>
      </ModalDialog>
    </ModalOverlay>,
    portalRoot,
  );
};

export default ErrorModal;
