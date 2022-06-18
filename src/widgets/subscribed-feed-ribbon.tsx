import React, { FC, MouseEventHandler, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { useDispatch, useSelector } from '../services/hooks';
import { RegularText, Divider, Preloader } from '../ui-lib';
import ScrollRibbon from './scroll-ribbon';
import ArticleFullPreview from './article-full-preview';

import { addLikeThunk, deleteLikeThunk, getPrivateFeedThunk } from '../thunks';
import { dividerGray } from '../constants/colors';

const RibbonWrapper = styled.ul`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template: 1fr / repeat(2,auto);
  grid-auto-flow: row;
  justify-items: stretch;
  list-style: none outside;
  margin: 0;
  padding: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  padding-inline-end: 0;
  row-gap: 32px;

  @media screen and (max-width:765px) {
      grid-template: 1fr / repeat(1,auto);
      row-gap: 32px;
  };
`;

const ItemWrapper = styled.li`
  overflow: hidden;
  max-width: 359px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style: none outside;
  margin: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  padding-inline-end: 0;
  // border-bottom: 2px solid ${dividerGray};
  &:nth-child(odd) {
    padding-right: 32px;
  };

  @media screen and (max-width: 1023px) {
    &:nth-child(odd) {
      padding-right: 20px;
    };

  @media screen and (max-width: 765px) {
    &:nth-child(odd) {
      padding-right: 0;
    };

  @media screen and (max-width:720px) {
    border-bottom: none;
  };
`;

const SubscribedFeedRibbon : FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.view.feed);
  const tags = useSelector((state) => state.view.selectedTags) ?? [];
  const { isPublicFeedFetching } = useSelector((state) => state.api);
  const isLogged = useSelector(
    (state) => state.system.isLoggedIn
      && !!state.profile.username,
  );

  useEffect(() => {
    dispatch(getPrivateFeedThunk());
  }, [dispatch]);

  if (!posts || isPublicFeedFetching) {
    // return (
    //   <RegularText size='large' weight={500}>
    //     <FormattedMessage id='loading' />
    //   </RegularText>
    // );
    return <Preloader />;
  }
  if (isLogged) {
    return (
      <ScrollRibbon>
        <RibbonWrapper>
          {posts.filter((post) => post.tagList.some((tag) => (tags.includes(tag)
              || !tags
              || tags.length < 1))).map((post) => {
            const onClick : MouseEventHandler = () => {
              if (post.favorited) {
                dispatch(deleteLikeThunk(post.slug));
              } else {
                dispatch(addLikeThunk(post.slug));
              }
            };
            return (
              <ItemWrapper key={post.slug}>
                <ArticleFullPreview
                  article={post}
                  onLikeClick={onClick} />
                {window.innerWidth > 765 && <Divider width={111} distance={0} />}
              </ItemWrapper>
            );
          })}
        </RibbonWrapper>
      </ScrollRibbon>
    );
  }
  return (
    <RegularText size='large' weight={500}>
      <FormattedMessage id='errorUnathorized' />
    </RegularText>
  );
};

export default SubscribedFeedRibbon;
