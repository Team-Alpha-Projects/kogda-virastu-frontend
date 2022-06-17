import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import {
  profileImagePostRequested,
  profileImagePostSucceeded,
  profileImagePostingFailed,
  setImageProfile,
  setImage,
} from '../store';
import { uploadImage } from '../services/api';
import { makeErrorObject } from '../services/helpers';
import { TAPIError, TAPIResponse } from '../services/api.types';
import { API_ROOT } from '../constants';

const postImageThunk: AppThunk = (profileImage: FormData) => async (dispatch) => {
  dispatch(profileImagePostRequested());
  try {
    const response: TAPIResponse = await uploadImage(profileImage);
    const responseUrl = response.data.url;
    const profileImageUrl = `${API_ROOT}${responseUrl}`;
    if (window.location.href.indexOf('settings') !== -1) {
      dispatch(setImageProfile(profileImageUrl));
    }
    if (window.location.href.indexOf('editArticle') !== -1) {
      dispatch(setImage(profileImageUrl));
    }
    dispatch(profileImagePostSucceeded());
  } catch (error) {
    dispatch(
      profileImagePostingFailed(
        makeErrorObject(error as AxiosError<TAPIError>),
      ),
    );
  }
};

export default postImageThunk;
