import React, { useEffect, FC } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import TopAnnounceWidget from '../widgets/top-announce-widget';
import PopularTags from '../widgets/popular-tags';
import { useSelector, useDispatch } from '../services/hooks';
import { setTopLikedThunk, setNewPostsThunk } from '../thunks';
import { Slider } from '../widgets';
import TabArticle from '../widgets/tab-article';
import { Preloader } from '../ui-lib';

const MainSection = styled.main`
  display: flex;
  justify-content: center;
  margin: 0;
`;

const MainContainer = styled.div`
  display: flex;
  margin: 56px 0 0 0;
  gap: 0 32px;
  justify-content: center;
  align-items: flex-start;
  max-width: 1140px;
  position: relative;
  z-index: 10;

  @media screen and (max-width: 1023px) {
    gap: 0 20px;
    margin: 48px 0 0 0;
  }

  @media screen and (max-width: 765px) {
    margin: 40px 0 0 0;
    flex-direction: column-reverse;
    gap: 0;
    width: 359px;
  }

  @media screen and (max-width: 720px) {
    padding: 0 20px;
    width: 280px;
  }
`;

const LeftColumn = styled.div`
  overflow: hidden;
  width: 749.325px;

  @media screen and (max-width: 1300px) {
    width: 626px;
  }

  @media screen and (max-width: 1023px) {
    width: 474px;
  }

  @media screen and (max-width: 765px) {
    width: 359px;
  }

  @media screen and (max-width: 720px) {
    width: 280px;
  } ;
`;

const RightColumn = styled.aside`
  display: flex;
  overflow: hidden;
  align-self: flex-start;
  flex-direction: column;
  width: 359px;

  @media screen and (max-width: 1300px) {
    width: 297px;
  }

  @media screen and (max-width: 1023px) {
    width: 227px;
  }

  @media screen and (max-width: 765px) {
    align-items: center;
    justify-content: center;
    width: 359px;
  }

  @media screen and (max-width: 720px) {
    width: 280px;
  } ;
`;

const Main: FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const { articles } = useSelector((state) => state.all);
  const { loading } = useSelector((state) => state.api);

  useEffect(() => {
    if (articles && articles.length > 0) {
      dispatch(setTopLikedThunk());
    }
  }, [dispatch, articles]);

  return (
    <>
      {loading && <Preloader />}
      <MainSection>
        <MainContainer>
          <LeftColumn>
            <TabArticle />
          </LeftColumn>
          <RightColumn>
            <PopularTags />
            {window.innerWidth < 765 && <Slider />}
            {window.innerWidth >= 765 && (
              <TopAnnounceWidget
                caption={intl.messages.popularContent as string} />
            )}
          </RightColumn>
        </MainContainer>
      </MainSection>
    </>
  );
};
export default Main;
