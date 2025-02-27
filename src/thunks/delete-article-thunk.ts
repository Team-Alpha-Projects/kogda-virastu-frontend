import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import {
  articleDeleteRequested,
  articleDeleteSucceeded,
  articleDeleteFailed,
  setViewFeed,
  clearViewArticle,
} from '../store';
import { deleteArticle } from '../services/api';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const deleteArticleThunk: AppThunk = (slug: string) => async (dispatch, getState) => {
  dispatch(articleDeleteRequested());
  try {
    await deleteArticle(slug);
    const articles = getState().view.feed ?? [];
    dispatch(setViewFeed(articles?.filter((item) => item.slug !== slug)));
    dispatch(clearViewArticle());
    dispatch(articleDeleteSucceeded());
  } catch (error) {
    dispatch(articleDeleteFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default deleteArticleThunk;
