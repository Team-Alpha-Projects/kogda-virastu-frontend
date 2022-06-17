import { AxiosError } from 'axios';
import { patchCurrentUser } from '../services/api';
import {
  settingsPatchFailed,
  settingsPatchRequested,
  settingsPatchSucceeded,
  settingsResetUpdateSucceeded,
  setUser,
  resetFormProfile,
} from '../store';

import { AppThunk } from '../store/store.types';
import { makeErrorObject } from '../services/helpers';
import { TAPIError, TAPIPatchUserData } from '../services/api.types';

const patchCurrentUserThunk: AppThunk = () => async (dispatch, getState) => {
  dispatch(settingsPatchRequested());
  const profile = getState().forms.profile ?? {};
  // Type Guards
  const userData: TAPIPatchUserData = {
    username: profile.username || '',
    email: profile.email || '',
    bio: profile.bio || '',
    image: profile.image || '',
    nickname: profile.nickname || '',
  };
  console.log(userData);

  if (profile.password) {
    userData.password = profile.password;
  }
  try {
    const {
      data: {
        user: {
          username, email, bio, image, nickname,
        },
      },
    } = await patchCurrentUser(userData);
    dispatch(setUser({
      username, email, bio, image, nickname,
    }));
    dispatch(resetFormProfile());
    dispatch(settingsPatchSucceeded());
    setTimeout(() => {
      dispatch(settingsResetUpdateSucceeded());
    }, 1000);
  } catch (error) {
    dispatch(settingsPatchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default patchCurrentUserThunk;
