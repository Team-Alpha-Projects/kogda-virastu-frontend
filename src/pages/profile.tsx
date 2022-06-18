import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../services/hooks';

import { ProfileWidget, FeedRibbon } from '../widgets';
import {
  getPublicFeedThunk,
  getUserProfileThunk,
} from '../thunks';
import {
  clearProfileFetchNotFound, clearErrorMessage, clearErrorObject, clearView,
} from '../store';
import ProfilePageLayout from '../layouts/profile-page-layout';
import { Preloader } from '../ui-lib';

const Profile: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector(
    (state) => state.view.profile,
  )
    ?? {
      username: '',
      nickname: '',
      following: false,
      email: '',
      bio: '',
      image: '',
    };
  const isUser = useSelector(
    (state) => !!state.profile.username
      && !!state.profile.email
      && (state.profile.username === state.view.profile?.username),
  );
  const { isProfileNotFound } = useSelector((state) => state.api);
  const totalCount = useSelector((state) => state.all.articlesCount);
  const { loading } = useSelector((state) => state.api);
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    dispatch(clearView());
    dispatch(getUserProfileThunk(username));
    return () => {
      dispatch(clearView());
    };
  }, [dispatch, username]);

  useEffect(() => {
    if (!!profile.username && !!totalCount) {
      dispatch(getPublicFeedThunk({ limit: totalCount ?? 20, author: username }));
    }
  }, [dispatch, username, totalCount, profile.username]);

  useEffect(() => {
    if (isProfileNotFound) {
      dispatch(clearProfileFetchNotFound());
      dispatch(clearErrorObject());
      dispatch(clearErrorMessage());
      navigate('/no-user');
    }
  }, [dispatch, navigate, isProfileNotFound]);

  if (loading) return <Preloader />;

  return (
    <ProfilePageLayout>
      <ProfileWidget
        userName={profile.nickname ?? profile.username}
        isFollow={profile.following}
        userImage={profile.image}
        bio={profile.bio}
        isUser={isUser}
        size='large'
        distance={0}
        color='' />
      <FeedRibbon />

    </ProfilePageLayout>

  );
};

export default Profile;
