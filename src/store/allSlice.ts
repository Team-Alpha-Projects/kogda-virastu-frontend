import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TArticles, TTags } from '../types/types';
import { TAPIUsers } from '../services/api.types';
import { TThemes } from '../types/styles.types';
import themes from '../themes';
import { TVocabularies } from '../types/vocabularies.types';
import vocabularies from '../vocabularies';

type TAllState = {
  articles: TArticles | null;
  articlesCount: number;
  tags: TTags | null;
  followingTags: TTags | null;
  popularTags: TTags | null;
  themes: TThemes,
  themesNames: Array<string>,
  vocabularies: TVocabularies,
  langNames: Array<string>,
  users: TAPIUsers | null,
};
const initialState : TAllState = {
  articles: null,
  articlesCount: 0,
  tags: null,
  followingTags: null,
  popularTags: null,
  themes,
  themesNames: Object.keys(themes),
  vocabularies,
  langNames: Object.keys(vocabularies),
  users: null,
};

const allSlice = createSlice({
  name: 'all',
  initialState,
  reducers: {
    setAllArticles: (state, action: PayloadAction<TArticles>) => ({
      ...state, articles: action.payload,
    }),
    setAllArticlesCount: (state, action: PayloadAction<number>) => ({
      ...state, articlesCount: action.payload,
    }),
    setAllTags: (state, action: PayloadAction<TTags>) => ({
      ...state, tags: action.payload,
    }),
    setFollowingTags: (state, action: PayloadAction<TTags>) => ({
      ...state, followingTags: action.payload,
    }),
    setPopularTags: (state, action: PayloadAction<TTags>) => ({
      ...state, popularTags: action.payload,
    }),
    clearArticles: (state) => ({ ...state, articles: null }),
    clearTags: (state) => ({ ...state, tags: null }),
    clearAll: (state) => ({ ...state, articles: null, tags: null }),
    setAllThemes: (state, action: PayloadAction<TThemes>) => ({
      ...state, themes: action.payload,
    }),
    setAllVocabularies: (state, action:PayloadAction<TVocabularies>) => ({
      ...state, vocabularies: action.payload,
    }),
    setUsers: (state, action: PayloadAction<TAPIUsers>) => ({
      ...state, users: action.payload,
    }),
  },
});

const allReducer = allSlice.reducer;
export const {
  setAllArticles,
  setAllArticlesCount,
  setAllTags,
  setFollowingTags,
  setPopularTags,
  clearArticles,
  clearTags,
  clearAll,
  setAllThemes,
  setAllVocabularies,
  setUsers,
} = allSlice.actions;
export default allReducer;
