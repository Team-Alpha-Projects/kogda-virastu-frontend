import { AxiosError } from 'axios';
import {
  followTagRequested,
  followTagSucceeded,
  followTagFailed,
  setTag,
  clearTag,
} from '../store';
import { AppThunk } from '../store/store.types';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';
import { postFollowTag } from '../services/api';

const followTagThunk: AppThunk = (tag: string) => async (dispatch) => {
  try {
    dispatch(followTagRequested());
    await postFollowTag(tag);
    dispatch(setTag(tag));
    setTimeout(() => {
      dispatch(followTagSucceeded());
    }, 800);
    setTimeout(() => {
      dispatch(dispatch(clearTag()));
    }, 1000);
  } catch (error) {
    dispatch(followTagFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default followTagThunk;
