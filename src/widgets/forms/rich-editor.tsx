import React, { FC } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from '../../services/hooks';
import { setBody, clearViewArticle } from '../../store';
import { LabelStyle } from '../../ui-lib/inputs/text-fields-styles';
import { ContainerTextArea } from '../../ui-lib/inputs/textarea-field-config';

const QuillContainer = styled.div`
  && .ql-editor {
    min-height: 300px
  }
`;

const Editor: FC = () => {
  const dispatch = useDispatch();
  const { body } = useSelector((state) => state.forms.article) ?? {};
  const initialArticle = useSelector((state) => state.view.article);
  const handleChange = (value: string) => {
    dispatch(setBody(value));
    dispatch(clearViewArticle());
  };
  const intl = useIntl();

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'link'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['blockquote', 'code-block'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: true,
    },
  };

  return (
    <ContainerTextArea>
      <LabelStyle>{intl.messages.articleText as string}</LabelStyle>
      <QuillContainer>
        <ReactQuill
          theme='snow'
          value={body === '' ? '' : body || initialArticle?.body || ''}
          onChange={handleChange}
          modules={modules} />
      </QuillContainer>
    </ContainerTextArea>
  );
};

export default Editor;
