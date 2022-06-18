import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import { postDeclineArticles } from '../services/api';
import {
  setViewFeed,
  declineArticlePostRequested,
  declineArticlePostSucceeded,
  declineArticlePostFailed,
} from '../store';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const declineArticleThunk: AppThunk = (slug: string) => async (dispatch, getState) => {
  try {
    dispatch(declineArticlePostRequested());
    await postDeclineArticles(slug);
    const articles = getState().view.feed ?? [];
    const currentUser = getState().profile.username;
    const thisArticle = articles.filter((item) => item.slug === slug);
    if (thisArticle[0].author.username !== currentUser) {
      dispatch(setViewFeed(articles.filter((item) => item.slug !== slug)));
    } else {
      dispatch(setViewFeed(articles));
    }
    dispatch(declineArticlePostSucceeded());
  } catch (error) {
    dispatch(declineArticlePostFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default declineArticleThunk;
