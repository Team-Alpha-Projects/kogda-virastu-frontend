import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AuthorHeadingWidget from './author-heading-widget';
import { TBriefPostAnnounceProps } from '../types/widgets.types';
import { HeaderFiveText } from '../ui-lib';
import { primaryBlack } from '../constants/colors';

const BriefPostAnnounceWrapper = styled.article`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: flex-start;
  max-height: 150px;
  width: 100%;
  word-break: break-all;
  @media screen and (max-width: 1918px) {
    width: 100%;
  }
  
`;

const BriefPostAnnounceWidget : React.FC<TBriefPostAnnounceProps> = ({
  slug,
  username,
  nickname,
  title,
  image,
  date,
  isLiked,
  likesCount,
  onLikeClick,
}) => {
  const navigate = useNavigate();
  return (
    <BriefPostAnnounceWrapper>
      <AuthorHeadingWidget
        username={username}
        nickname={nickname}
        date={date}
        image={image}
        isAuthor={false}
        isLiked={isLiked}
        likesCount={likesCount}
        onLikeClick={onLikeClick} />
      <HeaderFiveText onClick={() => navigate(`/article/${slug}`)} marginCSS='margin-right: 70px;' color={primaryBlack}>
        {title}
      </HeaderFiveText>
    </BriefPostAnnounceWrapper>
  );
};

export default BriefPostAnnounceWidget;
