import React from 'react';
import styled, { useTheme } from 'styled-components';
import { TCommentAuthorHeadingProps } from '../types/widgets.types';
import { useSelector } from '../services/hooks';
import Author from './author';
import { DeleteIcon } from '../ui-lib';

const HeadingContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 32px;
  gap: 0 8px;
  height: 40px;
`;

const CommentAuthorHeading: React.FC<TCommentAuthorHeadingProps> = ({
  username,
  nickname,
  image,
  date,
  isAuthor,
  onDeleteClick,
}) => {
  const theme = useTheme();
  const { roles } = useSelector((state) => state.profile);
  const admin = roles && roles.includes('admin');
  return (
    <HeadingContainer>
      <Author
        userName={username}
        nickname={nickname ?? username}
        imageSrc={image}
        createAt={date} />
      {isAuthor || admin ? (<DeleteIcon color={theme.button.red.default} onClick={onDeleteClick} />)
        : null}
    </HeadingContainer>
  );
};

export default CommentAuthorHeading;
