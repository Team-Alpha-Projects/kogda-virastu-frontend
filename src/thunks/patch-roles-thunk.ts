import { AxiosError } from 'axios';
import { patchRoles } from '../services/api';
import {
  rolesPatchRequested,
  rolesPatchSucceeded,
  rolesPatchFailed,
} from '../store';
import { AppThunk } from '../store/store.types';
import { makeErrorObject } from '../services/helpers';
import { TAPIError, TAPIUser } from '../services/api.types';

const patchRolesThunk: AppThunk = (user: TAPIUser) => async (dispatch) => {
  dispatch(rolesPatchRequested());

  const roles = user.roles.includes('admin') ? ['user'] : ['user', 'admin'];

  try {
    await patchRoles(user.username, roles);
    dispatch(rolesPatchSucceeded());
  } catch (error) {
    dispatch(rolesPatchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default patchRolesThunk;
