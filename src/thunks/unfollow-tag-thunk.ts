import { AxiosError } from 'axios';
import {
  unfollowTagRequested,
  unfollowTagSucceeded,
  unfollowTagFailed,
  setTag,
  clearTag,
} from '../store';
import { AppThunk } from '../store/store.types';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';
import { deleteFollowTag } from '../services/api';

const unfollowTagThunk: AppThunk = (tag: string) => async (dispatch) => {
  try {
    dispatch(unfollowTagRequested());
    await deleteFollowTag(tag);
    dispatch(setTag(tag));
    setTimeout(() => {
      dispatch(unfollowTagSucceeded());
    }, 800);
    setTimeout(() => {
      dispatch(dispatch(clearTag()));
    }, 1000);
  } catch (error) {
    dispatch(unfollowTagFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default unfollowTagThunk;
