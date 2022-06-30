import React, {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useEffect,
} from 'react';
import { useTheme } from 'styled-components';
import { useIntl, FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from '../../services/hooks';
import FollowedTags from '../followed-tags';
import InfoModal from '../info-modal';
import GenerateInviteContainer from '../generate-invite-widget';

import {
  setUsernameProfile,
  setEmailProfile,
  setBioProfile,
  setNicknameProfile,
  setFormProfile,
  setPasswordProfile,
  setConfirmPasswordProfile,
} from '../../store';

import { patchCurrentUserThunk, postImageThunk } from '../../thunks';

import {
  ButtonContainer,
  Form,
  FormContainer,
  FormTitle,
  InputFieldset,
} from './forms-styles';

import {
  FieldEmail,
  FieldLogin,
  FieldNick,
  FieldPassword,
  FieldConfirmPassword,
  FieldProfileImage,
  UpdateProfileButton,
  FieldAboutUser,
} from '../../ui-lib';

const SettingsForm: FC = () => {
  const {
    bio, email, username, password, confirmPassword, nickname,
  } = useSelector((state) => state.forms.profile);

  const profile = useSelector((state) => state.profile);

  const { isSettingsPatching, isSettingsUpdateSucceeded } = useSelector(
    (state) => state.api,
  );
  const intl = useIntl();

  const dispatch = useDispatch();
  const theme = useTheme();
  useEffect(() => {
    dispatch(
      setFormProfile({
        username: profile.username || '',
        email: profile.email || '',
        nickname: profile.nickname || '',
        bio: profile.bio || '',
        image: profile.image || '',
      }),
    );
  }, [dispatch, profile]);

  const submitForm: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    dispatch(patchCurrentUserThunk());
  };

  const changeImage : ChangeEventHandler<HTMLInputElement> = (evt) => {
    if (evt.target.files) {
      const profileImage = new FormData();
      profileImage.append('file', evt.target.files[0]);
      dispatch(postImageThunk(profileImage));
    }
  };

  const changeUsername: ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setUsernameProfile(evt.target.value));
  };

  const changeBioProfile: ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    dispatch(setBioProfile(evt.target.value));
  };

  const changeEmail: ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setEmailProfile(evt.target.value));
  };
  const changeNickname: ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setNicknameProfile(evt.target.value));
  };
  const changePassword: ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setPasswordProfile(evt.target.value));
  };
  const changeConfirmPassword: ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setConfirmPasswordProfile(evt.target.value));
  };

  return (
    <FormContainer>
      {isSettingsUpdateSucceeded && (
        <InfoModal
          isSettingsUpdateSucceeded={isSettingsUpdateSucceeded}
          message={`${intl.messages.profileUpdated as string}`} />
      )}
      <FormTitle>
        <FormattedMessage id='usersettings' />
      </FormTitle>
      <Form onSubmit={submitForm}>
        <InputFieldset rowGap={16}>
          <FieldProfileImage onChange={changeImage} />
          <FieldLogin value={username ?? ''} onChange={changeUsername} />
          <FieldNick value={nickname ?? ''} onChange={changeNickname} />
          <FieldAboutUser
            onChange={changeBioProfile}
            value={bio ?? ''}
            minHeight={theme.text18.height * 5} />
          <FieldEmail value={email ?? ''} onChange={changeEmail} />
          <FieldPassword
            value={password ?? ''}
            onChange={changePassword}
            error={confirmPassword !== password} />
          <FieldConfirmPassword
            value={confirmPassword ?? ''}
            onChange={changeConfirmPassword}
            error={confirmPassword !== password}
            errorText={
              confirmPassword !== password
                ? (intl.messages.passwordsAreNotEqual as string)
                : ''
            } />
        </InputFieldset>
        <GenerateInviteContainer />
        <FollowedTags />
        <ButtonContainer>
          <UpdateProfileButton
            disabled={
              isSettingsPatching
              || (!password && !confirmPassword)
              || confirmPassword !== password
            } />
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default SettingsForm;
