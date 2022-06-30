import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from '../services/hooks';
import Tag from './tag';
import { HeaderFiveText } from '../ui-lib';
import unfollowTagThunk from '../thunks/unfollow-tag-thunk';
import InfoModal from './info-modal';
import getUserTagsThunk from '../thunks/get-user-tags-thunk';

const PopularTagsContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 30px;
  position: relative;
  z-index: 10;

  @media screen and (max-width:768px) {
    margin-bottom: 40px;
  }
`;

const TagList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  column-gap: 24px;
`;

const FollowedTags: FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const followingTags = useSelector((state) => state.all.followingTags);
  const currentUser = useSelector((state) => state.profile);
  const user = currentUser.username;
  const isTagUnFollowing = useSelector((state) => state.api.isTagUnfollowing);
  const tagname = useSelector((state) => state.view.tag);

  useEffect(() => {
    if (user) {
      dispatch(getUserTagsThunk());
    }
  }, [dispatch, user]);

  const deactivateTag = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    dispatch(unfollowTagThunk(tag));
    setTimeout(() => {
      dispatch(getUserTagsThunk());
    }, 300);
  };

  if (followingTags && followingTags?.length !== 0) {
    return (
      <PopularTagsContainer>
        {isTagUnFollowing && tagname && (
        <InfoModal isTagUnFollowing={isTagUnFollowing} message={`${intl.messages.unsubscribeTag as string} #${tagname}`} />
        )}
        <HeaderFiveText paddingCSS='padding-bottom: 16px;'>
          <FormattedMessage id='followedTags' />
        </HeaderFiveText>
        <TagList>
          {
            followingTags && followingTags.map((tag) => (
              <Tag
                key={tag}
                tag={tag}
                pointer
                isDefault
                deactivateTag={(e) => deactivateTag(e, tag)} />
            ))
          }
        </TagList>
      </PopularTagsContainer>
    );
  }
  return (
    null
  );
};
export default FollowedTags;
