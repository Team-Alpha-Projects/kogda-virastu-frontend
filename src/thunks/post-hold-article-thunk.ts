import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import { postHoldArticles } from '../services/api';
import {
  setViewFeed,
  holdArticlePostRequested,
  holdArticlePostSucceeded,
  holdArticlePostFailed,
} from '../store';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';
import getArticleThunk from './get-article-thunk';
import getPublicFeedThunk from './get-public-feed-thunk';

const holdArticleThunk: AppThunk = (slug: string) => async (dispatch, getState) => {
  try {
    dispatch(holdArticlePostRequested());
    await postHoldArticles(slug);
    const articles = getState().view.feed ?? [];
    const currentUser = getState().profile.username;
    const thisArticle = articles.filter((item) => item.slug === slug);
    if (thisArticle[0].author.username !== currentUser) {
      dispatch(setViewFeed(articles.filter((item) => item.slug !== slug)));
    } else {
      dispatch(setViewFeed(articles));
    }
    dispatch(holdArticlePostSucceeded());
    setTimeout(() => {
      dispatch(getArticleThunk(slug));
    }, 400);
    setTimeout(() => {
      dispatch(getPublicFeedThunk());
    }, 300);
  } catch (error) {
    dispatch(holdArticlePostFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default holdArticleThunk;
