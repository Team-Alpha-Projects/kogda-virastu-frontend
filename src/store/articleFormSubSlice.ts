import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TArticleCore } from '../types/types';

type TArticleFormState = {
  title: string | null,
  description: string | null,
  body: string | null,
  tags: string | null,
  link: string | null
};

const initialState : TArticleFormState = {
  title: null,
  description: null,
  body: null,
  tags: null,
  link: null
};

const articleSubSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setTitle: (state : TArticleFormState, action: PayloadAction<string>) => ({
      ...state, title: action.payload,
    }),
    setDescription: (state : TArticleFormState, action: PayloadAction<string>) => ({
      ...state, description: action.payload,
    }),
    setBody: (state : TArticleFormState, action: PayloadAction<string>) => ({
      ...state, body: action.payload,
    }),
    setImage: (state : TArticleFormState, action: PayloadAction<string>) => ({
      ...state, link: action.payload,
    }),
    setTags: (state : TArticleFormState, action: PayloadAction<string>) => ({
      ...state, tags: action.payload,
    }),
    setArticle: (state : TArticleFormState, action : PayloadAction<Omit<TArticleCore, 'tagList'>>) => ({
      ...state, ...action.payload,
    }),
    resetArticle: (state :TArticleFormState) => ({
      ...state, ...initialState,
    }),
  },
});

const articleReducer = articleSubSlice.reducer;
export const {
  setTitle,
  setDescription,
  setBody,
  setTags,
  setArticle,
  resetArticle,
  setImage,
} = articleSubSlice.actions;
export default articleReducer;
