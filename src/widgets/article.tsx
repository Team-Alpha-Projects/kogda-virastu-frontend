import React, { FC, MouseEventHandler, useState } from 'react';
import { FormattedDate } from 'react-intl';
import DOMPurify from 'isomorphic-dompurify';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from '../services/hooks';
import {
  addLikeThunk, deleteLikeThunk,
} from '../thunks';
import { DeletePostButton, EditPostButton } from '../ui-lib';
import { openConfirm } from '../store';
import BarTags from './bar-tags';
import Likes from './likes';
import {
  PublishButton,
  RejectButton,
  PublishedButton,
  RemoveFromPublicationButton,
} from '../ui-lib/buttons';

type TArticleProps = {
  slug: string;
};

type TAdminProps = {
  admin: boolean;
};

type TArticleActionsProps = {
  onClickEdit: MouseEventHandler<HTMLButtonElement>;
  onClickDelete: MouseEventHandler<HTMLButtonElement>;
};

const ArticleContainer = styled.div`
  display: flex;
  flex-flow: column  nowrap;
  gap: 24px 0;
  width: 100%;
  max-width: 700px;

  @media screen and (max-width:768px) {
    gap: 16px 0;
 }
`;

const ArticleTitle = styled.h1`
    margin: 0;
    font-size: ${({ theme: { firstLevelHeading: { size } } }) => `${size}px`} ;
    font-family: ${({ theme: { firstLevelHeading: { family } } }) => family};
    line-height: ${({ theme: { firstLevelHeading: { height } } }) => `${height}px`} ;
    font-weight: ${({ theme: { firstLevelHeading: { weight } } }) => weight};
    color: ${({ theme: { primaryText } }) => primaryText};
`;

const ArticleActionsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  && > button {
    width:233px;
    @media screen  and (max-width:725px) {
      width:175px;
    }
  }
`;

const ArticleAdminActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ArticleAuthor = styled.p`
  font-size: ${({ theme: { text16: { size } } }) => size}px ;
  font-family: ${({ theme: { text16: { family } } }) => family};
  line-height: ${({ theme: { text16: { height } } }) => height}px;
  font-weight: ${({ theme: { text16: { weight } } }) => weight};
  margin: 0;
  grid-row: 1;
`;

const ArticleCreateDate = styled.p`
  font-size: ${({ theme: { text16: { size } } }) => size}px ;
  font-family: ${({ theme: { text16: { family } } }) => family};
  line-height: ${({ theme: { text16: { height } } }) => height}px;
  font-weight: ${({ theme: { text16: { weight } } }) => weight};
  margin: 0;
  grid-row: 1;
`;

const ArticleLikeWrapper = styled.div`
  grid-row: 1;
  justify-self: end;
`;

const ArticleAuthorContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  gap: 0 24px;
`;

const ArticleImage = styled.img`
  width: 100%;
  object-fit: cover;
  height: 100%;
`;

const ArticleBody = styled.div`
  font-family: ${({ theme: { text18: { family } } }) => family};
  font-size: ${({ theme: { text18: { size } } }) => size}px ;
  line-height: ${({ theme: { text18: { height } } }) => height}px;
  font-weight: ${({ theme: { text18: { weight } } }) => weight};
  margin: 0;

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

  @media screen and (max-width:768px) {
    font-family: ${({ theme: { text16: { family } } }) => family};
    font-size: ${({ theme: { text16: { size } } }) => size}px ;
    line-height: ${({ theme: { text16: { height } } }) => height}px;
    font-weight: ${({ theme: { text16: { weight } } }) => weight};
 }
`;

const ArticleActions: FC<TArticleActionsProps> = ({ onClickEdit, onClickDelete }) => (
  <ArticleActionsContainer>
    <EditPostButton onClick={onClickEdit} />
    <DeletePostButton onClick={onClickDelete} />
  </ArticleActionsContainer>
);

const ArticleAdminActions: FC<TAdminProps> = ({ admin }) => {
  const [isPublic, setPublic] = useState(false);
  const onPublicClick = () => {
    setPublic(true);
  };

  const onRemoveClick = () => {
    setPublic(false);
  };

  const onClick = () => {
    console.log('click');
  };

  return (
    <>
      {isPublic && admin && (
        <ArticleAdminActionsContainer>
          <PublishedButton onClick={onClick} />
          <RemoveFromPublicationButton onClick={onRemoveClick} />
        </ArticleAdminActionsContainer>
      )}
      {!isPublic && admin && (
        <ArticleAdminActionsContainer>
          <PublishButton onClick={onPublicClick} />
          <RejectButton onClick={onClick} />
        </ArticleAdminActionsContainer>
      )}
    </>
  );
};

const Article: FC<TArticleProps> = ({ slug }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { article } = useSelector((state) => state.view);
  const currentUser = useSelector((state) => state.profile);
  const isAuthor = article?.author.username === currentUser.username;
  const articleBody = DOMPurify.sanitize(article?.body || '');

  const onClickDelete = () => {
    if (article) {
      dispatch(openConfirm());
    }
  };

  const onClickEdit = () => {
    if (article && slug) {
      navigate(`/editArticle/${slug}`);
    }
  };

  const onClickLike = (ev: React.MouseEvent) => {
    ev.preventDefault();
    if (article?.favorited) {
      dispatch(deleteLikeThunk(slug));
    } else {
      dispatch(addLikeThunk(slug));
    }
  };

  const admin = true;

  if (!article) {
    return null;
  }
  return (
    <ArticleContainer>
      {isAuthor && !admin && (
        <ArticleActions onClickDelete={onClickDelete} onClickEdit={onClickEdit} />
      )}
      {admin && (
        <ArticleAdminActions admin />
      )}
      <ArticleTitle>{article.title}</ArticleTitle>
      <ArticleAuthorContainer>
        <ArticleAuthor>{article.author.nickname ?? article.author.username}</ArticleAuthor>
        <ArticleCreateDate>
          <FormattedDate
            value={article.createdAt}
            year='numeric'
            month='long'
            day='2-digit'
            weekday='short' />
        </ArticleCreateDate>
        <ArticleLikeWrapper>
          <Likes
            likesCounterValue={article.favoritesCount}
            handleClick={onClickLike}
            favorite={article.favorited} />
        </ArticleLikeWrapper>
      </ArticleAuthorContainer>
      {article.link && (
        <ArticleImage src={article.link} />
      )}
      <ArticleBody dangerouslySetInnerHTML={{ __html: articleBody }} />
      <BarTags tagList={article.tagList} />
    </ArticleContainer>
  );
};

export default Article;
