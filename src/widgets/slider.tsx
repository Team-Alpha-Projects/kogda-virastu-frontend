import styled from 'styled-components';
import React, {
  FC, useState, MouseEventHandler,
} from 'react';
import { useIntl } from 'react-intl';
import { LeftArrowIcon, RightArrowIcon } from '../ui-lib/icons';
import BuletSlider from '../ui-lib/buledSlider';
import { useSelector } from '../services/hooks';
import BriefPostAnnounceWidget from './brief-post-announce-widget';
import { TArticle } from '../types/types';
import { Divider, HeaderThreeText } from '../ui-lib';

const SlideContainer = styled.div`
@keyframes show{
0%{
opacity:0;
}
100% {
opacity:1;
}
}
opacity:0;
transition: 1s;
animation: show 3s 1;
animation-fill-mode: forwards;
animation-delay: 0s;
display: flex;
transition: margin-right .3s;
width: 100%;

  .link {
    display: flex;
    width: 100%;
    text-decoration: none;
  }
`;
const SlidersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 22px;
  width: 100%;

  @media screen and (max-width: 765px) {
      margin-bottom: 0;
  }
`;
type TSlide = {
  data: TArticle;
  name: number;
  page: number;
};
const Slide: FC<TSlide> = ({ data, name, page }) => {
  const {
    author: {
      username,
      nickname,
      image,
    },
    title,
    createdAt,
    favorited,
    favoritesCount,
    slug,
  } = data;
  const nope = (): void => {
  };
  if (page === name) {
    return (
      <SlideContainer>
        <BriefPostAnnounceWidget
          slug={slug}
          key={slug}
          username={username}
          nickname={nickname ?? username}
          title={title}
          image={image}
          date={new Date(createdAt)}
          isLiked={favorited}
          likesCount={favoritesCount}
          onLikeClick={nope} />
      </SlideContainer>
    );
  }
  return null;
};

const BuletBar = styled.div`
  display: flex;
  gap:12px;
  padding-top:16px;
  padding-bottom: 40px;
  max-width: 280px;
  align-items: center;

  @media screen and (max-width: 765px) {
    max-width: 232px;
  }
`;

const Arrow = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const Slider: FC = () => {
  const data = useSelector((state) => state.view.topFeed) ?? [];
  const range = [];
  const intl = useIntl();
  for (let i = 0; i < data?.length ?? 0; i += 1) {
    range.push(i);
  }
  const [page, setPage] = useState<number>(0);

  return (
    <SlidersContainer>
      <HeaderThreeText paddingCSS='padding-bottom: 24px;'>
        {intl.messages.popularContent as string}
      </HeaderThreeText>

      {
        data && data.length > 0 && data.map((DataSlide: TArticle, index: number) => (
          <Slide key={DataSlide.slug} data={DataSlide} name={index} page={page} />
        ))
      }
      <BuletBar>
        <Arrow type='button' onClick={() => { setPage((page - 1 + data.length) % data.length); }}>
          <LeftArrowIcon color='grey' />
        </Arrow>
        {
          data && range.map((pageSlide) => {
            const isActive = pageSlide === page;
            const onClickBullet: MouseEventHandler = () => {
              setPage(pageSlide);
            };
            return (
              <BuletSlider key={pageSlide} onClick={onClickBullet} isActive={isActive} />
            );
          })
        }
        <Arrow type='button' onClick={() => { setPage((page + 1) % data.length); }}>
          <RightArrowIcon color='grey' />
        </Arrow>
      </BuletBar>
      <Divider distance={0} />
    </SlidersContainer>

  );
};
export default Slider;
