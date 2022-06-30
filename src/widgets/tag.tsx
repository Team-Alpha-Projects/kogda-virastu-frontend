import React, { FC, MouseEventHandler, MouseEvent } from 'react';
import styled, { useTheme } from 'styled-components';
import { CrossIcon } from '../ui-lib';
import { getPropOnCondition } from '../services/helpers';

interface ITagProps extends ITagButtonProps {
  tag: string;
  handleClick?: (e: MouseEvent<HTMLButtonElement>, tag: string) => void;
  deactivateTag?: MouseEventHandler<SVGSVGElement>;
}

interface ITagButtonProps {
  isActive?: boolean;
  pointer?: boolean;
  isFollowing?: boolean | undefined | null;
  isDefault?: boolean | undefined | null;
}

const Button = styled.button<ITagButtonProps>`
  padding: 0;
  border: none;
  font-family: ${({ theme }) => theme.text18Sans.family};
  font-weight: ${({ theme }) => theme.text18Sans.weight};
  font-size: ${({ theme }) => theme.text18Sans.size}px;
  line-height: ${({ theme }) => theme.text18Sans.height}px;
  cursor: ${({ pointer }) => getPropOnCondition(pointer, 'inherit', 'pointer')};
  display: flex;
  align-items: center;
  color: ${({ isActive, theme, isFollowing }) => (isActive && theme.button.blue.default)
    || (isFollowing && theme.button.red.default)
    || theme.secondaryText};
  background-color: transparent;

  :active {
    outline: none;
  }
`;

const Tag: FC<ITagProps> = ({
  tag,
  handleClick = () => {},
  isActive,
  deactivateTag,
  pointer,
  isFollowing,
  isDefault,
}) => {
  const theme = useTheme();

  return (
    <Button
      isActive={isActive}
      isFollowing={isFollowing}
      isDefault={isDefault}
      pointer={pointer}
      type='button'
      key={tag}
      onClick={(e) => handleClick(e, tag)}>
      #
      {tag}
      {' '}
      {isActive && deactivateTag && (
        <CrossIcon color={theme.markedText} onClick={deactivateTag} />
      )}
      {isDefault && deactivateTag && (
        <CrossIcon color={theme.secondaryText} onClick={deactivateTag} />
      )}
    </Button>
  );
};

Tag.defaultProps = {
  handleClick: undefined,
  deactivateTag: undefined,
  pointer: false,
  isActive: false,
  isFollowing: false,
  isDefault: undefined,
};

export default Tag;
