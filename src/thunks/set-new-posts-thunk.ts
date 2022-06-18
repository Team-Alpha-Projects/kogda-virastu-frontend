import { AppThunk } from '../store/store.types';

import { setNewFeed } from '../store';

import { compareCreatedDatesForTop, makeNewFeed } from '../services/helpers';

const setNewPostsThunk: AppThunk = (qty = 5) => (dispatch, getState) => {
  const articles = getState().all.articles ?? [];
  setTimeout(() => {
    dispatch(setNewFeed(makeNewFeed(articles, compareCreatedDatesForTop, qty as number)));
  }, 500);
};

export default setNewPostsThunk;
