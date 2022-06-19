import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import { postPublishArticles } from '../services/api';
import {
  setPendingFeed,
  publishArticlePostRequested,
  publishArticlePostSucceeded,
  publishArticlePostFailed,
} from '../store';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';
import getArticleThunk from './get-article-thunk';
import getPublicFeedThunk from './get-public-feed-thunk';

const publishArticleThunk: AppThunk = (slug: string) => async (dispatch, getState) => {
  try {
    dispatch(publishArticlePostRequested());
    await postPublishArticles(slug);
    const articles = getState().view.pendingFeed ?? [];
    dispatch(setPendingFeed(articles.filter((item) => item.slug !== slug)));
    dispatch(publishArticlePostSucceeded());
    setTimeout(() => {
      dispatch(getArticleThunk(slug));
    }, 400);
    setTimeout(() => {
      dispatch(getPublicFeedThunk());
    }, 300);
  } catch (error) {
    dispatch(publishArticlePostFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default publishArticleThunk;
