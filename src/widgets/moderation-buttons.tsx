import React, { FC, useState } from 'react';
import styled from 'styled-components';
import {
  PublishButton,
  RejectButton,
  PublishedButton,
  RemoveFromPublicationButton,
} from '../ui-lib/buttons';

// type TTestProps = {
//   test:
// };

const ButonContainer = styled.div`
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  column-gap: 16px;
`;

const ModerationButtons: FC = () => {
  const [isPublic, setPublic] = useState(false);
  const admin = true;
  const onPublicClick = () => {
    setPublic(true);
  };

  const onRemoveClick = () => {
    setPublic(false);
  };

  const onClick = () => {
  };
  return (
    <>
      {isPublic && admin && (
        <ButonContainer>
          <PublishedButton onClick={onClick} />
          <RemoveFromPublicationButton onClick={onRemoveClick} />
        </ButonContainer>
      )}
      {!isPublic && admin && (
        <ButonContainer>
          <PublishButton onClick={onPublicClick} />
          <RejectButton onClick={onClick} />
        </ButonContainer>
      )}
    </>
  );
};

export default ModerationButtons;
