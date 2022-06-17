import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import { fetchTopArticles } from '../services/api';
import {
  topArticlesRequested,
  topArticlesSucceeded,
  topArticlesFailed,
  setTopFeed,
} from '../store';
import { makeErrorObject } from '../services/helpers';
import { TAPIError } from '../services/api.types';

const setTopLikedThunk: AppThunk = () => async (dispatch) => {
  try {
    dispatch(topArticlesRequested());
    const
      { data: { articles } } = await fetchTopArticles();
    dispatch(setTopFeed(articles));
    dispatch(topArticlesSucceeded());
  } catch (error) {
    dispatch(topArticlesFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default setTopLikedThunk;
