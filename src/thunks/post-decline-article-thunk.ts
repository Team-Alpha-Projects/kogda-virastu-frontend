import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import { postDeclineArticles } from '../services/api';
import {
  setPendingFeed,
  declineArticlePostRequested,
  declineArticlePostSucceeded,
  declineArticlePostFailed,
} from '../store';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';
import getArticleThunk from './get-article-thunk';

const declineArticleThunk: AppThunk = (slug: string) => async (dispatch, getState) => {
  try {
    dispatch(declineArticlePostRequested());
    await postDeclineArticles(slug);
    const articles = getState().view.pendingFeed ?? [];
    const currentUser = getState().profile.username;
    const thisArticle = articles.filter((item) => item.slug === slug);
    if (thisArticle[0].author.username !== currentUser) {
      dispatch(setPendingFeed(articles.filter((item) => item.slug !== slug)));
    } else {
      dispatch(setPendingFeed(articles));
    }
    dispatch(declineArticlePostSucceeded());
    setTimeout(() => {
      dispatch(getArticleThunk(slug));
    }, 400);
  } catch (error) {
    dispatch(declineArticlePostFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default declineArticleThunk;
