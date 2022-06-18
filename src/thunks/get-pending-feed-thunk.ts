import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { fetchPendingArticles } from '../services/api';
import {
  pendingFeedSucceeded,
  pendingFeedFailed,
  pendingFeedRequested,
  setFeedCount,
  setViewFeed,
} from '../store';
import { AppThunk } from '../store/store.types';
import { makeErrorObject } from '../services/helpers';
import { TAPIError, TAPIParamsObject } from '../services/api.types';

const getPendingFeedThunk: AppThunk = (
  params: TAPIParamsObject,
) => async (dispatch) => {
  try {
    batch(() => {
      dispatch(pendingFeedRequested());
    });
    const
      { data: { articles, articlesCount } } = await fetchPendingArticles(params);
    batch(() => {
      dispatch(setViewFeed(articles));
      dispatch(setFeedCount(articlesCount));
      dispatch(pendingFeedSucceeded());
    });
  } catch (error) {
    dispatch(pendingFeedFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getPendingFeedThunk;
