import React, { FC } from 'react';
import styled from 'styled-components';
import { nanoid } from '@reduxjs/toolkit';
import { useSelector } from '../services/hooks';

import Tag from './tag';

type TPreviewTags = {
  tagList: string[];
};

type TLists = {
  isHasImage?: boolean;
  rowReverse?: boolean;
};

const Lists = styled.ul<TLists>`
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  flex-direction: 'row';
  gap: 4px 24px;
  white-space: pre-line;
  padding: 0;
  
  @media screen and (max-width: 600px) {
    max-width: 352px;
    margin: 0;

    flex-direction: row;
  }
`;

Lists.defaultProps = {
  isHasImage: false,
  rowReverse: false,
};

const List = styled.li`
  list-style-type: none;
`;

const PreviewTags: FC<TPreviewTags & TLists> = ({
  tagList,
  isHasImage = false,
  rowReverse = false,
}) => {
  const { selectedTags } = useSelector((state) => state.view);
  return (
    <Lists isHasImage={isHasImage} rowReverse={rowReverse}>
      {tagList.map((tag) => (
        <List key={nanoid(10)}>
          <Tag tag={tag} isActive={!!selectedTags?.includes(tag)} />
        </List>
      ))}
    </Lists>
  );
};

PreviewTags.defaultProps = {
  isHasImage: false,
  rowReverse: false,
};

export default PreviewTags;
