import React, { FC } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from '../services/hooks';
import { deleteCommentThunk, declineCommentThunk, getCommentsThunk } from '../thunks';
import Comment from './comment';

const List = styled.ul`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  list-style: none;
    &:not(:last-child) {
      margin-bottom: 24px;
  }
`;

type CommentListProps = {
  slug: string
};

const CommentList: FC<CommentListProps> = ({ slug }) => {
  const dispatch = useDispatch();
  const { commentsFeed: comments } = useSelector((store) => store.view);
  const currentUser = useSelector((state) => state.profile);
  const { roles } = useSelector((state) => state.profile);
  const isAdmin = roles && roles.includes('admin');
  const onDeleteClick = (commentId: string, isAuthor: boolean) => {
    if (isAdmin && isAuthor === false) {
      dispatch(declineCommentThunk(slug, commentId));
    } else { dispatch(deleteCommentThunk(slug, commentId)); }
    setTimeout(() => {
      dispatch(getCommentsThunk(slug));
    }, 200);
  };

  if (!comments || !comments.length) {
    return null;
  }
  return (
    <List>
      {comments.map((comment) => (
        <Item key={comment.id}>
          <Comment
            username={comment.author.username}
            createAt={new Date(comment.createdAt)}
            nickname={comment.author.nickname ?? comment.author.username}
            image={comment.author.image}
            body={comment.body}
            isAuthor={comment.author.username === currentUser.username}
            onDeleteClick={onDeleteClick}
            commentId={comment.id} />
        </Item>
      ))}
    </List>
  );
};

export default CommentList;
