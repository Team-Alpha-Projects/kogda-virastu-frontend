import { useNavigate, useSearchParams } from 'react-router-dom';
import React, {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useEffect,
  FocusEventHandler,
} from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector, useDispatch } from '../../services/hooks';
import {
  changeUsernameRegister,
  changeEmailRegister,
  changePasswordRegister,
  changeConfirmPasswordRegister,
  resetFormRegister,
  changeNicknameRegister,
  changeInviteRegister,
} from '../../store';
import { registerThunk } from '../../thunks';
import {
  ButtonContainer,
  Form,
  FormContainer,
  FormLoginLink,
  FormTitle,
  InputFieldset,
} from './forms-styles';
import {
  FieldEmail,
  FieldLogin,
  FieldNick,
  FieldPassword,
  FieldConfirmPassword,
  RegisterButton,
  FieldInvite,
} from '../../ui-lib';

const RegisterForm: FC = () => {
  const {
    username, email, password, confirmPassword, nickname, invite,
  } = useSelector((state) => state.forms.register);
  const { isUserRegistering } = useSelector((state) => state.api);
  const { isLoggedIn } = useSelector((state) => state.system);
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const inviteFromUrl = searchParams.get('');

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(changeEmailRegister(evt.target.value));
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(changePasswordRegister(evt.target.value));
  };

  const onChangeConfirmPassword: ChangeEventHandler<HTMLInputElement> = (
    evt,
  ) => {
    dispatch(changeConfirmPasswordRegister(evt.target.value));
  };

  const onChangeUsername: ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(changeUsernameRegister(evt.target.value));
  };

  const onChangeInvite: ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(changeInviteRegister(evt.target.value));
  };

  const onFocusEmail: FocusEventHandler<HTMLInputElement> = () => {
    if (inviteFromUrl != null) dispatch(changeInviteRegister(inviteFromUrl));
  };

  const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(changeNicknameRegister(evt.target.value));
  };

  const submitForm: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    if (password === confirmPassword) {
      dispatch(registerThunk());
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
    dispatch(resetFormRegister());
  }, [dispatch, isLoggedIn, navigate]);

  return (
    <FormContainer>
      <FormTitle>
        <FormattedMessage id='register' />
      </FormTitle>
      <FormLoginLink to='/login'>
        <FormattedMessage id='userLogin' />
      </FormLoginLink>
      <Form onSubmit={submitForm}>
        <InputFieldset rowGap={16}>
          <FieldLogin value={username ?? ''} onChange={onChangeUsername} />
          <FieldNick value={nickname ?? ''} onChange={onChangeNickname} />
          <FieldEmail
            value={email ?? ''}
            onChange={onChangeEmail}
            onFocus={onFocusEmail} />
          <FieldInvite
            value={invite ?? inviteFromUrl ?? ''}
            onChange={onChangeInvite} />
          <FieldPassword
            value={password ?? ''}
            onChange={onChangePassword}
            error={confirmPassword !== password} />
          <FieldConfirmPassword
            value={confirmPassword ?? ''}
            onChange={onChangeConfirmPassword}
            error={confirmPassword !== password}
            errorText={
              confirmPassword !== password
                ? (intl.messages.passwordsAreNotEqual as string)
                : ''
            } />
        </InputFieldset>
        <ButtonContainer>
          <RegisterButton
            disabled={
              isUserRegistering
              || (!password && !confirmPassword)
              || confirmPassword !== password
            } />
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default RegisterForm;
