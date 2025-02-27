import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from '../services/hooks';
import {
  Article,
  CommentInput,
  CommentList,
  NewAnnounceWidget,
} from '../widgets';
import {
  getArticleThunk, getCommentsThunk, setNewPostsThunk, getPublicFeedThunk, setTopLikedThunk,
} from '../thunks';
import {
  clearArticleFetchNotFound, clearErrorMessage, clearErrorObject, resetArticle,
} from '../store';
import Slider from '../widgets/slider';
import { desktopBreakpoint, mobileViewThreshold, tabletBreakpoint } from '../constants';
import { Preloader } from '../ui-lib';

const desktopToTabletGapStep = (80 - 40) / (desktopBreakpoint - tabletBreakpoint);
const tabletToMobileGapStep = (40 - 20) / (tabletBreakpoint - mobileViewThreshold);
const tabletToMobileMainWidthStop = (720 - 595) / (tabletBreakpoint - mobileViewThreshold);
const desktopToTabletAsideWidthStep = (359 - 227) / (desktopBreakpoint - tabletBreakpoint);

const ArticlePageWrapper = styled.div`
  max-width: 700px;
  width: 100%;
  @media screen and (max-width:1035px) {
      max-width: 453px;
  }

  @media screen and (max-width:767px) {
    max-width: 100%;
  }
`;

const CommentInputWrapper = styled.div`
  margin-bottom: 24px;
`;

const CommentTitle = styled.p`
  font-family: ${({ theme: { fourthLevelHeading: { family } } }) => family};
  font-size: ${({ theme: { fourthLevelHeading: { size } } }) => size}px;
  font-weight: ${({ theme: { fourthLevelHeading: { weight } } }) => weight};
  line-height: ${({ theme: { fourthLevelHeading: { height } } }) => height}px;
  margin: 48px 0 24px;
`;

const ArticleSection = styled.section`
   display: flex;
    margin: 56px auto 0 auto;
    gap: 0 calc(80px - ${desktopToTabletGapStep} * (${desktopBreakpoint}px - 100vw));
    justify-content: center;
    align-items: flex-start;
    max-width:1140px;
    position: relative;
    z-index: 10;
    padding-top: 56px;

    @media screen and (max-width:${tabletBreakpoint}px) {
      padding: 48px 24px 0 24px;
      gap: 0 calc(40px - ${tabletToMobileGapStep} * (${tabletBreakpoint}px - 100vw)) ;
      width: calc(720px - ${tabletToMobileMainWidthStop} * (${tabletBreakpoint}px - 100vw));
  }
  @media screen and (max-width: 767px) {
    flex-direction: column-reverse;
    gap: 0;
    padding: 40px 20px 0 20px;
    margin: 0;
    box-sizing: border-box;
    width: 100%;
  }
`;
const RightColumn = styled.aside`
    display: flex;
    overflow: hidden;
    align-self: flex-start;
    flex-direction: column;
    max-width: 360px;
    @media screen and (max-width:1600px) {
      width: calc(359px - ${desktopToTabletAsideWidthStep} * (${desktopBreakpoint}px - 100vw));
    }
  @media screen and (max-width:767px) {
    margin:auto;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 765px) {
      width: 100%;
    }
  }
`;

const ArticlePage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { commentsFeed: comments } = useSelector((store) => store.view);
  const { isLoggedIn } = useSelector((state) => state.system);
  const intl = useIntl();
  const { slug } = useParams();
  const { isArticleNotFound, isArticleRemoved, loading } = useSelector((state) => state.api);

  useEffect(() => {
    dispatch(resetArticle());
    dispatch(getCommentsThunk(slug));
    dispatch(getArticleThunk(slug));
    dispatch(getPublicFeedThunk());
  }, [dispatch, slug]);

  useEffect(() => {
    dispatch(setTopLikedThunk());
    setTimeout(() => {
      dispatch(setNewPostsThunk());
    }, 400);
  }, [dispatch]);

  useEffect(() => {
    if (isArticleNotFound) {
      dispatch(clearArticleFetchNotFound());
      dispatch(clearErrorObject());
      dispatch(clearErrorMessage());
      navigate('/no-article');
    }
  }, [dispatch, navigate, isArticleNotFound]);

  useEffect(() => {
    if (isArticleRemoved) {
      navigate('/');
    }
  }, [navigate, isArticleRemoved]);
  if (loading) return <Preloader />;

  return (
    <ArticleSection>
      <ArticlePageWrapper>
        {!!slug && <Article slug={slug} />}
        {(isLoggedIn || !!comments?.length) ? (
          <CommentTitle>
            <FormattedMessage id='comments' />
          </CommentTitle>
        ) : null}
        {!!slug && (
        <CommentInputWrapper>
          <CommentInput slug={slug} />
        </CommentInputWrapper>
        )}
        {!!slug && <CommentList slug={slug} />}
      </ArticlePageWrapper>
      <RightColumn>
        <Slider />
        <NewAnnounceWidget caption={intl.messages.freshContent as string} />
      </RightColumn>
    </ArticleSection>
  );
};
export default ArticlePage;
