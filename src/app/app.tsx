import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import { useDispatch, useSelector } from '../services/hooks';
import { jwt } from '../services/api';
import {
  deleteArticleThunk,
  getUserThunk,
  getPopularTags,
} from '../thunks';
import basicThemes, { defaultTheme } from '../themes/index';
import { closeConfirm, setLanguage, clearErrorObject } from '../store';
import Header from '../widgets/Header';
import Footer from '../widgets/Footer';
import Profile from '../pages/profile';
import NotFound from '../pages/not-found';
import Main from '../pages/main';
import Login from '../pages/login';
import Register from '../pages/register';
import Settings from '../pages/settings';
import ArticlePage from '../pages/article-page';
import Editor from '../pages/editor';
import Admin from '../pages/admin';
import { Modal, ErrorModal } from '../widgets';
import { IGenericVoidHandler } from '../types/widgets.types';

const App = () => {
  const dispatch = useDispatch();
  const { currentTheme, currentLang } = useSelector((state) => state.system);
  const { themes, langNames, vocabularies } = useSelector((state) => state.all);
  const { isDeleteConfirmOpen } = useSelector((state) => state.system);
  const { username, nickname } = useSelector((state) => state.profile);
  const slug = useSelector((state) => state.view.article?.slug) ?? '';
  const { errorObject } = useSelector((state) => state.api);
  const onConfirmDelete: IGenericVoidHandler = () => {
    dispatch(deleteArticleThunk(slug));
    dispatch(closeConfirm());
  };
  const onConfirmClose: IGenericVoidHandler = () => dispatch(closeConfirm());
  const onConfirmErrorClose: IGenericVoidHandler = () => dispatch(clearErrorObject());

  useEffect(() => {
    dispatch(getPopularTags());

    if (jwt.test()) {
      dispatch(getUserThunk());
    }
  }, [dispatch, username, nickname]);

  useEffect(() => {
    const language = navigator.language.split('-')[0];
    if (langNames.includes(language)) {
      dispatch(setLanguage(language));
    }
  }, [dispatch, langNames]);

  return (
    <IntlProvider locale={currentLang} messages={vocabularies[currentLang]}>
      <ThemeProvider
        theme={
          themes[currentTheme ?? defaultTheme]
          ?? basicThemes[currentTheme ?? defaultTheme]
        }>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Register />} />
          <Route path='/editArticle' element={<Editor />} />
          <Route path='/editArticle/:slug' element={<Editor />} />
          <Route path='/profile/:username' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/article/:slug' element={<ArticlePage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
        {isDeleteConfirmOpen && (
          <Modal onClose={onConfirmClose} onSubmit={onConfirmDelete} />
        )}
        {errorObject && (
          <ErrorModal onClose={onConfirmErrorClose} onSubmit={onConfirmErrorClose} />
        )}
      </ThemeProvider>
    </IntlProvider>
  );
};

export default App;
