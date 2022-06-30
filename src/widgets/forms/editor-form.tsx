import React, {
  useEffect, FC, ChangeEventHandler, FormEventHandler, useState,
} from 'react';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from '../../services/hooks';
import RichEditor from './rich-editor';

import {
  setTitle,
  setDescription,
  setTags,
  openConfirm,
  articleDeleteClear,
  articlePatchClear,
  articlePostClear,
} from '../../store';
import {
  getArticleThunk,
  patchArticleThunk,
  postArticleThunk,
  postImageThunk,
} from '../../thunks';
import {
  ButtonContainer,
  ButtonsWrapper,
  Form,
  FormContainer,
  FormTitle,
  InputFieldset,
} from './forms-styles';

import {
  DeletePostButton,
  FieldNameArticle,
  FieldTags,
  FieldUrl,
  PublishPostButton,
  SavePostButton,
  FieldAboutArticle,
} from '../../ui-lib';

const EditorForm: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    title, description, tags,
  } = useSelector((state) => state.forms.article) ?? {};
  const {
    isArticleFetching,
    isArticlePostingSucceeded,
    isArticlePatchingSucceeded,
    isArticleRemoved,
    isArticlePatching,
    isArticlePosting,
  } = useSelector((state) => state.api);
  const { slug } = useParams();
  const initialArticle = useSelector((state) => state.view.article);
  const [isPosted, setPostRequested] = useState(false);
  const [isRemoving, setRemoveState] = useState(false);

  useEffect(() => {
    if (initialArticle?.tagList) {
      dispatch(setTags(initialArticle.tagList.toString()));
    }
  }, [initialArticle, dispatch]);

  useEffect(
    () => {
      if (isPosted && isArticlePatchingSucceeded) {
        dispatch(articlePatchClear());
        navigate('/');
      } else if (isPosted && isArticlePostingSucceeded) {
        dispatch(articlePostClear());
        navigate('/');
      } else if (isArticleRemoved && isRemoving) {
        dispatch(articleDeleteClear());
        navigate('/');
      }
    },
    [
      dispatch,
      navigate,
      isPosted,
      isArticlePostingSucceeded,
      isArticlePatchingSucceeded,
      isArticleRemoved,
      isRemoving],
  );

  useEffect(() => {
    if (slug && !title) {
      dispatch(getArticleThunk(slug));
    }
  }, [slug, dispatch, title]);

  if (slug && isArticleFetching) {
    return <div>Подождите...</div>;
  }

  const onChangeTitle : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setTitle(evt.target.value));
  };

  const onChangeDescription : ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    dispatch(setDescription(evt.target.value));
    // eslint-disable-next-line no-param-reassign
    evt.target.style.height = `${evt.target.scrollHeight + 2}px`;
  };

  const onChangeTags : ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setTags(evt.target.value));
  };

  const onChangeImage : ChangeEventHandler<HTMLInputElement> = (evt) => {
    if (evt.target.files) {
      const articleImage = new FormData();
      articleImage.append('file', evt.target.files[0]);
      dispatch(postImageThunk(articleImage));
    }
  };

  const submitForm : FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    setPostRequested(true);
    if (slug) {
      dispatch(patchArticleThunk(slug));
    } else {
      dispatch(postArticleThunk());
    }
  };

  const deleteArticle = () => {
    setRemoveState(true);
    dispatch(openConfirm());
  };
  const makeButtons = () => (
    slug ? (
      <ButtonsWrapper>
        <SavePostButton disabled={isArticleFetching} />
        <DeletePostButton onClick={deleteArticle} />
      </ButtonsWrapper>
    ) : (
      <PublishPostButton disabled={isArticleFetching || isArticlePatching || isArticlePosting} />
    )
  );

  const makeMessageId = () => {
    if (slug) {
      return 'editArticle';
    }
    return 'newArticle';
  };

  return (
    <FormContainer>
      <FormTitle>
        <FormattedMessage id={makeMessageId()} />
      </FormTitle>
      <Form onSubmit={submitForm}>
        <InputFieldset rowGap={24}>
          <FieldNameArticle
            value={title === '' ? '' : title || initialArticle?.title || ''}
            onChange={onChangeTitle} />
          <FieldAboutArticle
            value={
              description === '' ? ''
                : description || initialArticle?.description || ''
            }
            onChange={onChangeDescription} />
          <FieldUrl
            onChange={onChangeImage} />
          <RichEditor />
          <FieldTags
            value={tags === '' ? '' : tags || ''}
            onChange={onChangeTags} />
        </InputFieldset>
        <ButtonContainer>
          {makeButtons()}
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default EditorForm;
