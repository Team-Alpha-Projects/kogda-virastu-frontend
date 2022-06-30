import { AxiosError } from 'axios';
import { fetchUserTags } from '../services/api';
import { setFollowingTags, tagsFetchFailed } from '../store';
import { AppThunk } from '../store/store.types';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const getUserTagsThunk: AppThunk = () => async (dispatch) => {
  try {
    const {
      data: { tags },
    } = await fetchUserTags();
    dispatch(setFollowingTags(tags));
  } catch (error) {
    dispatch(tagsFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getUserTagsThunk;
