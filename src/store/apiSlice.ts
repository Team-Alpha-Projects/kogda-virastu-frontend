import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAPIError } from '../services/api.types';

type TAPIState = {
  successMessage: string | null,
  errorMessage: string | null,
  errorObject: TAPIError | null,
  isUserRegistering: boolean,
  isUserFetching: boolean,
  isUserLoggingIn: boolean,
  isUserPatching: boolean,
  isPublicFeedFetching: boolean,
  isArticleFetching: boolean,
  isArticleNotFound: boolean,
  isPrivateFeedFetching: boolean,
  isArticlePosting: boolean,
  isArticlePostingSucceeded: boolean,
  isArticleDeleting: boolean,
  isArticleRemoved: boolean,
  isArticlePatching: boolean,
  isArticlePatchingSucceeded: boolean,
  isLikeArticlePosting: boolean,
  isLikeArticleDeleting: boolean,
  isTagsFetching: boolean,
  isCommentsFetching: boolean,
  isCommentPosting: boolean,
  isCommentDeleting: boolean,
  isProfileFetching: boolean,
  isProfileNotFound: boolean,
  isFollowProfilePosting: boolean,
  isFollowProfileDeleting: boolean,
  isSettingsPatching: boolean,
  isSettingsUpdateSucceeded: boolean,
  isAllPostsRequested: boolean,
  isTagFollowing: boolean,
  isTagUnfollowing: boolean,
  isInviteGenerating: boolean,
  areUsersFetching: boolean,
  areRolesPatching: boolean,
  isInviteCopying: boolean,
  profileImagePosting: boolean,
  profileImagePostingSucceeded: boolean,
  profileImagePostingFailed: boolean,
  areArticlesRequested: boolean,
  loading: boolean,
};

const initialState : TAPIState = {
  successMessage: null,
  errorMessage: null,
  errorObject: null,
  isUserRegistering: false,
  isUserLoggingIn: false,
  isUserFetching: false,
  isUserPatching: false,
  isPublicFeedFetching: false,
  isArticleFetching: false,
  isArticleNotFound: false,
  isPrivateFeedFetching: false,
  isArticlePosting: false,
  isArticlePostingSucceeded: false,
  isArticleDeleting: false,
  isArticleRemoved: false,
  isArticlePatching: false,
  isArticlePatchingSucceeded: false,
  isLikeArticlePosting: false,
  isLikeArticleDeleting: false,
  isTagsFetching: false,
  isCommentsFetching: false,
  isCommentPosting: false,
  isCommentDeleting: false,
  isProfileFetching: false,
  isProfileNotFound: false,
  isFollowProfilePosting: false,
  isFollowProfileDeleting: false,
  isSettingsPatching: false,
  isSettingsUpdateSucceeded: false,
  isAllPostsRequested: false,
  isTagFollowing: false,
  isTagUnfollowing: false,
  isInviteGenerating: false,
  areUsersFetching: false,
  areRolesPatching: false,
  isInviteCopying: false,
  profileImagePosting: false,
  profileImagePostingSucceeded: false,
  profileImagePostingFailed: false,
  areArticlesRequested: false,
  loading: false,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setSuccessMessage: (state, action: PayloadAction<string>) => ({
      ...state, successMessage: action.payload,
    }),
    clearSuccessMessage: (state) => ({
      ...state, successMessage: null,
    }),
    setErrorMessage: (state, action: PayloadAction<string>) => ({
      ...state, errorMessage: action.payload,
    }),
    clearErrorMessage: (state) => ({
      ...state, errorMessage: null,
    }),
    setErrorObject: (state, action: PayloadAction<TAPIError>) => ({
      ...state, errorObject: action.payload,
    }),
    clearErrorObject: (state) => ({
      ...state, errorObject: null,
    }),
    allPostsRequested: (state) => ({
      ...state, isAllPostsRequested: true, loading: true,
    }),
    allPostsRequestSucceeded: (state) => ({
      ...state, isAllPostsRequested: false, loading: false,
    }),
    allPostsRequestFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isUserRegistering: false, errorObject: action.payload, loading: false,
    }),
    userRegistrationRequested: (state) => ({
      ...state, isUserRegistering: true,
    }),
    userRegistrationSucceeded: (state) => ({
      ...state, isUserRegistering: false,
    }),
    userRegistrationFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isUserRegistering: false, errorObject: action.payload,
    }),
    userLoginRequested: (state) => ({
      ...state, isUserLoggingIn: true,
    }),
    userLoginSucceeded: (state) => ({
      ...state, isUserLoggingIn: false,
    }),
    userLoginFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isUserLoggingIn: false, errorObject: action.payload,
    }),
    userFetchRequested: (state) => ({
      ...state, isUserFetching: true,
    }),
    userFetchSucceeded: (state) => ({
      ...state, isUserFetching: false,
    }),
    userFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isUserFetching: false, errorObject: action.payload,
    }),
    usersFetchRequested: (state) => ({
      ...state, areUsersFetching: true,
    }),
    usersFetchSucceeded: (state) => ({
      ...state, areUsersFetching: false,
    }),
    usersFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, areUsersFetching: false, errorObject: action.payload,
    }),
    userPatchRequested: (state) => ({
      ...state, isUserPatching: true, loading: true,
    }),
    userPatchSucceeded: (state) => ({
      ...state, isUserPatching: false, loading: false,
    }),
    userPatchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isUserPatching: false, errorObject: action.payload, loading: false,
    }),
    publicFeedRequested: (state) => ({
      ...state, isPublicFeedFetching: true,
    }),
    publicFeedSucceeded: (state) => ({
      ...state, isPublicFeedFetching: false,
    }),
    publicFeedFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isPublicFeedFetching: false, errorObject: action.payload,
    }),
    articleFetchRequested: (state) => ({
      ...state, isArticleFetching: true, isArticleNotFound: false, loading: true,
    }),
    articleFetchSucceeded: (state) => ({
      ...state, isArticleFetching: false, isArticleNotFound: false, loading: false,
    }),
    articleFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isArticleFetching: false, errorObject: action.payload, loading: false,
    }),
    setArticleFetchNotFound: (state) => ({
      ...state, isArticleNotFound: true,
    }),
    clearArticleFetchNotFound: (state) => ({
      ...state, isArticleNotFound: false,
    }),
    privateFeedRequested: (state) => ({
      ...state, isPrivateFeedFetching: true, loading: true,
    }),
    privateFeedSucceeded: (state) => ({
      ...state, isPrivateFeedFetching: false, loading: false,
    }),
    privateFeedFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isPrivateFeedFetching: false, errorObject: action.payload, loading: false,
    }),
    articlePostRequested: (state) => ({
      ...state, isArticlePosting: true, sArticlePostingSucceeded: false,
    }),
    articlePostSucceeded: (state) => ({
      ...state, isArticlePosting: false, isArticlePostingSucceeded: true,
    }),
    articlePostClear: (state) => ({
      ...state,
      isArticlePosting: false,
      isArticlePostingSucceeded: false,
      successMessage: null,
      errorMessage: null,
      errorObject: null,
    }),
    articlePostFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isArticlePosting: false, errorObject: action.payload,
    }),
    articleDeleteRequested: (state) => ({
      ...state, isArticleDeleting: true, isArticleRemoved: false,
    }),
    articleDeleteSucceeded: (state) => ({
      ...state, isArticleDeleting: false, isArticleRemoved: true,
    }),
    articleDeleteFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isArticleDeleting: false, errorObject: action.payload,
    }),
    articleDeleteClear: (state) => ({
      ...state,
      isArticleDeleting: false,
      isArticleRemoved: false,
      successMessage: null,
      errorMessage: null,
      errorObject: null,
    }),
    articlePatchRequested: (state) => ({
      ...state, isArticlePatching: true,
    }),
    articlePatchSucceeded: (state) => ({
      ...state, isArticlePatching: false, isArticlePatchingSucceeded: true,
    }),
    articlePatchClear: (state) => ({
      ...state,
      isArticlePatching: false,
      isArticlePatchingSucceeded: false,
      successMessage: null,
      errorMessage: null,
      errorObject: null,
    }),
    articlePatchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isArticlePatching: false, errorObject: action.payload,
    }),
    likeArticlePostRequested: (state) => ({
      ...state, isLikeArticlePosting: true,
    }),
    likeArticlePostSucceeded: (state) => ({
      ...state, isLikeArticlePosting: false,
    }),
    likeArticlePostFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isLikeArticlePosting: false, errorObject: action.payload,
    }),
    likeArticleDeleteRequested: (state) => ({
      ...state, isLikeArticleDeleting: true,
    }),
    likeArticleDeleteSucceeded: (state) => ({
      ...state, isLikeArticleDeleting: false,
    }),
    likeArticleDeleteFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isLikeArticleDeleting: false, errorObject: action.payload,
    }),
    tagsFetchRequested: (state) => ({
      ...state, isTagsFetching: true,
    }),
    tagsFetchSucceeded: (state) => ({
      ...state, isTagsFetching: false,
    }),
    tagsFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isTagsFetching: false, errorObject: action.payload,
    }),
    commentsFetchRequested: (state) => ({
      ...state, isCommentsFetching: true,
    }),
    commentsFetchSucceeded: (state) => ({
      ...state, isCommentsFetching: false,
    }),
    commentsFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isCommentsFetching: false, errorObject: action.payload,
    }),
    commentPostRequested: (state) => ({
      ...state, isCommentPosting: true,
    }),
    commentPostSucceeded: (state) => ({
      ...state, isCommentPosting: false,
    }),
    commentPostFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isCommentPosting: false, errorObject: action.payload,
    }),
    commentDeleteRequested: (state) => ({
      ...state, isCommentDeleting: true,
    }),
    commentDeleteSucceeded: (state) => ({
      ...state, isCommentDeleting: false,
    }),
    commentDeleteFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isCommentDeleting: false, errorObject: action.payload,
    }),
    profileFetchRequested: (state) => ({
      ...state, isProfileFetching: true, isProfileNotFound: false, loading: true,
    }),
    profileFetchSucceeded: (state) => ({
      ...state, isProfileFetching: false, isProfileNotFound: false, loading: false,
    }),
    profileFetchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isProfileFetching: false, errorObject: action.payload, loading: false,
    }),
    setProfileFetchNotFound: (state) => ({
      ...state, isProfileNotFound: true,
    }),
    clearProfileFetchNotFound: (state) => ({
      ...state, isProfileNotFound: false,
    }),
    followProfilePostRequested: (state) => ({
      ...state, isFollowProfilePosting: true,
    }),
    followProfilePostSucceeded: (state) => ({
      ...state, isFollowProfilePosting: false,
    }),
    followProfilePostFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isFollowProfilePosting: false, errorObject: action.payload,
    }),
    followProfileDeleteRequested: (state) => ({
      ...state, isFollowProfileDeleting: true,
    }),
    followProfileDeleteSucceeded: (state) => ({
      ...state, isFollowProfileDeleting: false,
    }),
    followProfileDeleteFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isFollowProfileDeleting: false, errorObject: action.payload,
    }),
    settingsPatchRequested: (state) => ({
      ...state, isSettingsPatching: true, isSettingsUpdateSucceeded: false,
    }),
    settingsPatchSucceeded: (state) => ({
      ...state, isSettingsPatching: false, isSettingsUpdateSucceeded: true,
    }),
    settingsResetUpdateSucceeded: (state) => ({
      ...state, isSettingsUpdateSucceeded: false, errorObject: null,
    }),
    settingsPatchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state,
      isSettingsPatching: false,
      isSettingsUpdateSucceeded: false,
      errorObject: action.payload,
    }),
    followTagRequested: (state) => ({
      ...state, isTagFollowing: true,
    }),
    followTagSucceeded: (state) => ({
      ...state, isTagFollowing: false,
    }),
    followTagFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isTagFollowing: false, errorObject: action.payload,
    }),
    unfollowTagRequested: (state) => ({
      ...state, isTagUnfollowing: true,
    }),
    unfollowTagSucceeded: (state) => ({
      ...state, isTagUnfollowing: false,
    }),
    unfollowTagFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isTagUnfollowing: false, errorObject: action.payload,
    }),
    generateInviteRequested: (state) => ({
      ...state, isInviteGenerating: true,
    }),
    generateInviteSucceeded: (state) => ({
      ...state, isInviteGenerating: false,
    }),
    rolesPatchRequested: (state) => ({
      ...state, areRolesPatching: true,
    }),
    rolesPatchSucceeded: (state) => ({
      ...state, areRolesPatching: false,
    }),
    rolesPatchFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, areRolesPatching: false, errorObject: action.payload,
    }),
    generateInviteFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isInviteGenerating: false, errorObject: action.payload,
    }),
    copyInviteRequested: (state) => ({
      ...state, isInviteCopying: true,
    }),
    copyInviteSucceeded: (state) => ({
      ...state, isInviteCopying: false,
    }),
    copyInviteFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, isInviteCopying: false, errorObject: action.payload,
    }),
    profileImagePostRequested: (state) => ({
      ...state, profileImagePosting: true, profileImagePostingSucceeded: false,
    }),
    profileImagePostSucceeded: (state) => ({
      ...state, profileImagePosting: false, profileImagePostingSucceeded: true,
    }),
    profileImagePostingFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, profileImagePostSucceeded: false, errorObject: action.payload,
    }),
    topArticlesRequested: (state) => ({
      ...state, areArticlesRequested: true,
    }),
    topArticlesSucceeded: (state) => ({
      ...state, areArticlesRequested: false,
    }),
    topArticlesFailed: (state, action: PayloadAction<TAPIError>) => ({
      ...state, areArticlesRequested: false, errorObject: action.payload,
    }),
  },
});

const apiReducer = apiSlice.reducer;
export const {
  followTagRequested,
  followTagSucceeded,
  followTagFailed,
  unfollowTagRequested,
  unfollowTagSucceeded,
  unfollowTagFailed,
  setSuccessMessage,
  setErrorMessage,
  clearSuccessMessage,
  clearErrorMessage,
  clearErrorObject,
  setErrorObject,
  userRegistrationRequested,
  userRegistrationSucceeded,
  userRegistrationFailed,
  userLoginRequested,
  userLoginSucceeded,
  userLoginFailed,
  userFetchRequested,
  userFetchSucceeded,
  userFetchFailed,
  userPatchRequested,
  userPatchSucceeded,
  userPatchFailed,
  publicFeedRequested,
  publicFeedSucceeded,
  publicFeedFailed,
  articleFetchRequested,
  articleFetchSucceeded,
  articleFetchFailed,
  privateFeedRequested,
  privateFeedSucceeded,
  privateFeedFailed,
  articlePostRequested,
  articlePostSucceeded,
  articlePostFailed,
  articleDeleteRequested,
  articleDeleteSucceeded,
  articleDeleteFailed,
  articlePatchRequested,
  articlePatchSucceeded,
  articlePatchFailed,
  likeArticlePostRequested,
  likeArticlePostSucceeded,
  likeArticlePostFailed,
  likeArticleDeleteRequested,
  likeArticleDeleteSucceeded,
  likeArticleDeleteFailed,
  tagsFetchRequested,
  tagsFetchSucceeded,
  tagsFetchFailed,
  commentsFetchRequested,
  commentsFetchSucceeded,
  commentsFetchFailed,
  commentPostRequested,
  commentPostSucceeded,
  commentPostFailed,
  commentDeleteRequested,
  commentDeleteSucceeded,
  commentDeleteFailed,
  profileFetchRequested,
  profileFetchSucceeded,
  profileFetchFailed,
  followProfilePostRequested,
  followProfilePostSucceeded,
  followProfilePostFailed,
  followProfileDeleteRequested,
  followProfileDeleteSucceeded,
  followProfileDeleteFailed,
  settingsPatchFailed,
  settingsPatchRequested,
  settingsPatchSucceeded,
  settingsResetUpdateSucceeded,
  allPostsRequested,
  allPostsRequestSucceeded,
  allPostsRequestFailed,
  setArticleFetchNotFound,
  clearArticleFetchNotFound,
  clearProfileFetchNotFound,
  setProfileFetchNotFound,
  articleDeleteClear,
  articlePatchClear,
  articlePostClear,
  generateInviteRequested,
  generateInviteSucceeded,
  usersFetchRequested,
  usersFetchSucceeded,
  usersFetchFailed,
  rolesPatchRequested,
  rolesPatchSucceeded,
  rolesPatchFailed,
  generateInviteFailed,
  copyInviteRequested,
  copyInviteSucceeded,
  copyInviteFailed,
  profileImagePostRequested,
  profileImagePostSucceeded,
  profileImagePostingFailed,
  topArticlesRequested,
  topArticlesSucceeded,
  topArticlesFailed,
} = apiSlice.actions;
export default apiReducer;
