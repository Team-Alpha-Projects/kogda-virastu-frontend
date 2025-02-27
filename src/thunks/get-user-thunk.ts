import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import {
  userFetchRequested,
  userFetchSucceeded,
  userFetchFailed,
  setUser, onLogin,
} from '../store';
import { fetchCurrentUser, jwt } from '../services/api';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const getUserProfileThunk: AppThunk = () => async (dispatch) => {
  dispatch(userFetchRequested());
  try {
    const {
      data: {
        user: {
          username, email, bio, image, token, nickname, roles,
        },
      },
    } = await fetchCurrentUser();
    jwt.set(token);
    dispatch(setUser({
      username, email, bio, image, nickname, roles,
    }));
    dispatch(userFetchSucceeded());
    dispatch(onLogin());
  } catch (error) {
    dispatch(userFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default getUserProfileThunk;
