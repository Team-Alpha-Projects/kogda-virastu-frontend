import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import {
  commentDeleteRequested,
  commentDeleteSucceeded,
  commentDeleteFailed,
  setViewCommentsFeed,
} from '../store';
import { declineComment } from '../services/api';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const declineCommentThunk: AppThunk = (
  slug: string,
  commentId: string,
) => async (dispatch, getState) => {
  dispatch(commentDeleteRequested());
  const { view: { commentsFeed } } = getState();
  try {
    const { status } = await declineComment(slug, commentId);
    if (status === 204) {
      dispatch(commentDeleteSucceeded());
      dispatch(setViewCommentsFeed(
        commentsFeed?.filter((comment) => comment.id !== commentId) ?? [],
      ));
    }
  } catch (error) {
    dispatch(commentDeleteFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default declineCommentThunk;
