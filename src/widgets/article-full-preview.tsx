/* eslint-disable*/
import React, { FC, MouseEventHandler } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import AuthorHeadingWidget from './author-heading-widget';
import { TArticle } from '../types/types';
import PreviewTags from './preview-tags';
import { Divider } from '../ui-lib';
import { getPropOnCondition } from '../services/helpers';

const ArticleCardContainer = styled.div`
    //width: 359px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 32px;

    // @media screen and (max-width: 1300px) {
    //     width: 297px;
    // }

    // @media screen and (max-width: 1023px) {
    //     width: 227px;
    // }

    // @media screen and (max-width: 765px) {
    //     width: 359px;
    // }

    // @media screen and (max-width:720px) {
    //   width: 280px;
    // };
`;

const ArticleName = styled.h2`
    width:100%;
    margin: 0;
    font-size: ${({ theme: { secondLevelHeading: { size } } }) => `${size}px`} ;
    font-family: ${({ theme: { secondLevelHeading: { family } } }) => family};
    line-height: ${({ theme: { secondLevelHeading: { height } } }) => `${height}px`} ;
    font-weight: ${({ theme: { secondLevelHeading: { weight } } }) => weight};
    color: ${({ theme: { primaryText } }) => primaryText};
    word-break:break-all;
 @media screen and (max-width: 768px) {
        font-size: ${({ theme: { secondLevelHeadingMobile: { size } } }) => `${size}px`} ;
        font-family: ${({ theme: { secondLevelHeadingMobile: { family } } }) => family};
        line-height: ${({ theme: { secondLevelHeadingMobile: { height } } }) => `${height}px`} ;
        font-weight: ${({ theme: { secondLevelHeadingMobile: { weight } } }) => weight};
 }
 @media screen and (max-width: 320px) {
    grid-column: 1/1;
}
`;

type TElementWithImage = {
  image?: string,
};

const BarTagsWrapper = styled.div<TElementWithImage>`
  width:100%;
  @media screen and (max-width:600px) {
    ${({ image }) => getPropOnCondition(!!image, 'grid-row: 3/4', 'grid-row: 4/5 ')};
  }

`;

const ContentContainer = styled.div<TElementWithImage>`
    display: flex;
    row-gap: 16px;
    flex-direction: column;
    .link {
        font-size: ${({ theme: { text18Sans: { size } } }) => `${size}px`} ;
        font-family: ${({ theme: { text18Sans: { family } } }) => family};
        line-height: ${({ theme: { text18Sans: { height } } }) => `${height}px`} ;
        font-weight: ${({ theme: { text18Sans: { weight } } }) => weight};
        color: ${(props) => props.theme.button.red.default};
        width: 106px;
        text-decoration: none;
        &:hover {
            color: ${(props) => props.theme.button.red.hover};
        }
        &:active {
            color: ${(props) => props.theme.button.red.active};
        }
        
`;

const ArticleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const Article = styled.article<TElementWithImage>`
  font-size: ${({ theme: { text18Sans: { size } } }) => `${size}px`};
  font-family: ${({ theme: { text18Sans: { family } } }) => family};
  line-height: ${({ theme: { text18Sans: { height } } }) => `${height}px`};
  font-weight: ${({ theme: { text18Sans: { weight } } }) => weight};
  color: ${({ theme: { primaryText } }) => primaryText};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -moz-box;
  -moz-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 9;
  -webkit-box-orient: vertical;
  line-clamp: 9;
  box-orient: vertical;
  
  > blockquote {
    border-left: 4px solid #ccc;
    margin: 5px 0 5px;
    padding-left: 16px;
  }
  
  > pre {
    background-color: #23241f;
    color: #f8f8f2;
    overflow: visible;
    white-space: pre-wrap;
    margin: 10px;
    padding: 5px 10px;
    box-sizing: border-box;
  }
  
   ${((props) => !props.image && 'grid-column: 1/3')};
  @media screen and (max-width: 768px) {
      font-size: ${({ theme: { text16Sans: { size } } }) => `${size}px`};
      font-family: ${({ theme: { text16Sans: { family } } }) => family};
      line-height: ${({ theme: { text16Sans: { height } } }) => `${height}px`};
      font-weight: ${({ theme: { text16Sans: { weight } } }) => weight};
  }
  @media screen and (max-width: 600px) {
      grid-column: 1/1;
  }
`;

type TArticleFullPreview = {
  article: TArticle,
  onLikeClick: MouseEventHandler,
};

const ImageContainer = styled.div`
  width: 100%;
  max-height: 205px;
  height: 20vw;

  @media screen and (max-width: 765px) {
    height: 170px;
  }

  @media screen and (max-width: 720px) {
    height: 150px;
  }
`

const ArticleFullPreview: FC<TArticleFullPreview> = ({ article, onLikeClick }) => {
  const articleBody = DOMPurify.sanitize(article?.body || '');

  return (
    <ArticleCardContainer>
      <AuthorHeadingWidget
        username={article.author?.username}
        nickname={article.author?.nickname ?? article.author?.username}
        image={article.author.image}
        date={new Date(article.createdAt)}
        isLiked={article.favorited}
        likesCount={article.favoritesCount}
        onLikeClick={onLikeClick} />
      <ContentContainer image={article.link}>
        <ArticleName>{article.title}</ArticleName>
        {article.link && <ImageContainer><ArticleImage src={article.link} /></ImageContainer>}
        <Article image={article.link} dangerouslySetInnerHTML={{ __html: articleBody }} />
        <BarTagsWrapper image={article.link}>
          <PreviewTags
            isHasImage={!!article.link}
            rowReverse
            tagList={article.tagList} />
        </BarTagsWrapper>
        <Link className='link' to={`/article/${article.slug}`}>
          <FormattedMessage id='articleEnter' />
        </Link>
      </ContentContainer>
    </ArticleCardContainer>
  );
};

export default ArticleFullPreview;
