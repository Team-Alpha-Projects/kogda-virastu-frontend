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

const publishArticleThunk: AppThunk = (slug: string) => async (dispatch, getState) => {
  try {
    dispatch(publishArticlePostRequested());
    await postPublishArticles(slug);
    const articles = getState().view.pendingFeed ?? [];
    const currentUser = getState().profile.username;
    const thisArticle = articles.filter((item) => item.slug === slug);
    if (thisArticle[0].author.username !== currentUser) {
      dispatch(setPendingFeed(articles.filter((item) => item.slug !== slug)));
    } else {
      dispatch(setPendingFeed(articles));
    }
    dispatch(publishArticlePostSucceeded());
    setTimeout(() => {
      dispatch(getArticleThunk(slug));
    }, 400);
  } catch (error) {
    dispatch(publishArticlePostFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default publishArticleThunk;
