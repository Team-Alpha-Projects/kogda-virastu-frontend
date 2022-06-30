import { AxiosError, AxiosResponse } from 'axios';
import { AppThunk } from '../store/store.types';
import {
  usersFetchRequested,
  usersFetchSucceeded,
  usersFetchFailed,
  setUsers,
} from '../store';
import { fetchUsers } from '../services/api';
import { TAPIError, TAPIUserData } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const getUsersThunk: AppThunk = () => async (dispatch) => {
  dispatch(usersFetchRequested());
  try {
    const { data: { users } } = await fetchUsers() as AxiosResponse<TAPIUserData>;
    dispatch(setUsers(users));
    dispatch(usersFetchSucceeded());
  } catch (error) {
    dispatch(usersFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getUsersThunk;
