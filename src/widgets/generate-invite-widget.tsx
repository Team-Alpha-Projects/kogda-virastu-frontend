import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { GenerateInviteButton, CopyInviteButton } from '../ui-lib/buttons';
import { useDispatch, useSelector } from '../services/hooks';
import generateInviteThunk from '../thunks/generate-invite-thunk';
import { copyInviteRequested, copyInviteSucceeded, copyInviteFailed } from '../store';
import InfoModal from './info-modal';
import { TAPIError } from '../services/api.types';

const GenerateInviteContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 30px;
  position: relative;
  z-index: 10;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 24px;

  @media screen and (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const InviteGenerationContainer: FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const { isInviteGenerating } = useSelector((state) => state.api);
  const { isInviteCopying } = useSelector((state) => state.api);
  const generatedInvite = useSelector(
    (state) => state.forms.profile.generatedInvite,
  );

  const copyLinkToClipboard = () => {
    if (generatedInvite) {
      dispatch(copyInviteRequested());
      const inviteLink = `${window.location.origin}/registration?=${generatedInvite}`;
      navigator.clipboard.writeText(inviteLink).then(() => {
        setTimeout(() => {
          dispatch(copyInviteSucceeded());
        }, 1000);
        return null;
      }).catch((e) => {
        dispatch(
          copyInviteFailed(e as TAPIError),
        );
      });
    }
  };

  return (
    <GenerateInviteContainer>
      {isInviteCopying && (
        <InfoModal isInviteCopying={isInviteCopying} message={`${intl.messages.inviteCopied as string}`} />
      )}
      <GenerateInviteButton
        disabled={isInviteGenerating}
        onClick={() => dispatch(generateInviteThunk())} />
      {generatedInvite && (
        <CopyInviteButton
          disabled={isInviteCopying}
          onClick={() => copyLinkToClipboard()} />
      )}
    </GenerateInviteContainer>
  );
};

export default InviteGenerationContainer;
