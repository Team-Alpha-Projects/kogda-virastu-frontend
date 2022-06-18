import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import { fetchTopArticles } from '../services/api';
import {
  topArticlesRequested,
  topArticlesSucceeded,
  topArticlesFailed,
  setTopFeed,
} from '../store';
import { TAPIError } from '../services/api.types';
import { makeTopFeed, makeErrorObject } from '../services/helpers';

const setTopLikedThunk: AppThunk = (qty = 7) => async (dispatch) => {
  try {
    dispatch(topArticlesRequested());
    const
      { data: { articles } } = await fetchTopArticles();
    dispatch(setTopFeed(makeTopFeed(articles, qty as number)));
    dispatch(topArticlesSucceeded());
  } catch (error) {
    dispatch(topArticlesFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default setTopLikedThunk;
