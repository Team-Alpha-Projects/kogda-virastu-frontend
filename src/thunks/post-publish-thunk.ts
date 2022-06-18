import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import { postPublishArticles } from '../services/api';
import {
  setViewFeed,
  publishArticlePostRequested,
  publishArticlePostSucceeded,
  publishArticlePostFailed,
} from '../store';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const publishArticleThunk: AppThunk = (slug: string) => async (dispatch, getState) => {
  try {
    dispatch(publishArticlePostRequested());
    await postPublishArticles(slug);
    const articles = getState().view.feed ?? [];
    const currentUser = getState().profile.username;
    const thisArticle = articles.filter((item) => item.slug === slug);
    if (thisArticle[0].author.username !== currentUser) {
      dispatch(setViewFeed(articles.filter((item) => item.slug !== slug)));
    } else {
      dispatch(setViewFeed(articles));
    }
    dispatch(publishArticlePostSucceeded());
  } catch (error) {
    dispatch(publishArticlePostFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default publishArticleThunk;
