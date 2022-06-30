import { AxiosError } from 'axios';
import {
  generateInviteRequested,
  generateInviteSucceeded,
  setGeneratedInvite,
  generateInviteFailed,
} from '../store';
import { AppThunk } from '../store/store.types';
import { makeErrorObject } from '../services/helpers';
import { postGenerateInvite } from '../services/api';
import { TAPIError } from '../services/api.types';

const generateInviteThunk: AppThunk = () => async (dispatch) => {
  try {
    dispatch(generateInviteRequested());
    const {
      data: { code },
    } = (await postGenerateInvite());
    if (code) {
      dispatch(setGeneratedInvite(code));
    }
    dispatch(generateInviteSucceeded());
  } catch (error) {
    dispatch(
      generateInviteFailed(makeErrorObject(error as AxiosError<TAPIError>)),
    );
  }
};
export default generateInviteThunk;
