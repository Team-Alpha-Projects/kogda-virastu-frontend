import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import { postComment } from '../services/api';
import {
  commentPostRequested,
  commentPostSucceeded,
  commentPostFailed,
  setViewCommentsFeed,
  resetComment,
} from '../store';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';
import getCommentsThunk from './get-comments-thunk';

const createCommentThunk: AppThunk = (slug: string) => async (dispatch, getState) => {
  const newComment = getState().forms.comment.comment ?? '';
  try {
    if (newComment) {
      dispatch(commentPostRequested());
      const { data: { comment } } = await postComment(slug, newComment);
      dispatch(setViewCommentsFeed([comment]));
      dispatch(resetComment());
      dispatch(commentPostSucceeded());
      setTimeout(() => {
        dispatch(getCommentsThunk(slug));
      }, 200);
    }
  } catch (error) {
    dispatch(commentPostFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default createCommentThunk;
