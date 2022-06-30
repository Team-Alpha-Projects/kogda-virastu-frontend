import { AxiosError } from 'axios';
import { fetchPopularTags } from '../services/api';
import { setPopularTags, tagsFetchFailed } from '../store';
import { AppThunk } from '../store/store.types';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const getPopularTags: AppThunk = () => async (dispatch) => {
  try {
    const {
      data: { tags },
    } = await fetchPopularTags();

    const tagNameList = tags.map((item) => item.name);

    if (tagNameList) {
      dispatch(setPopularTags(tagNameList));
    }
  } catch (error) {
    dispatch(tagsFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getPopularTags;
