import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import { postPublishArticles } from '../services/api';
import {
  setPendingFeed,
  setViewFeed,
  publishArticlePostRequested,
  publishArticlePostSucceeded,
  publishArticlePostFailed,
} from '../store';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';
import getArticleThunk from './get-article-thunk';

const publishArticleUserThunk: AppThunk = (slug: string) => async (dispatch, getState) => {
  try {
    dispatch(publishArticlePostRequested());
    await postPublishArticles(slug);
    const articles = getState().view.pendingFeed ?? [];
    dispatch(setViewFeed(articles));
    dispatch(publishArticlePostSucceeded());
    setTimeout(() => {
      dispatch(getArticleThunk(slug));
    }, 400);
  } catch (error) {
    dispatch(publishArticlePostFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default publishArticleUserThunk;
