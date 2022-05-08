import React, { useEffect, FC } from 'react';
import { useDispatch } from '../../services/hooks';
import Banner from './Banner';
import MainView from './MainView';
import Tags from './Tags';
import styled from 'styled-components';
import { clearView } from '../../store';
import getAllTagsThunk from '../../thunks/get-all-tags-thunk';
import {DeletePostButton, EditPostButton} from "../../ui-lib/buttons";

const Al = styled.p`
  font-family: ${({ theme: { firstLevelHeading: { family } } }) => family};
  font-size: ${({ theme: { firstLevelHeading: { size } } }) => size}px;
  color: ${({ theme: { markedText } }) => markedText};
`;



const Home: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTagsThunk());
    return () => {
      dispatch(clearView());
    };
  }, [dispatch]);

  return (
    <div className='home-page'>
  <Al>fghhhgfgh</Al>
      <Banner />
      <div className='container page'>
        <div className='row'>
          <MainView />
          <div className='col-md-3'>
            <div className='sidebar'>
              <p>Popular Tags</p>
            </div>
            <EditPostButton onClick={() => console.log('Меня нажали!!')} />
            <DeletePostButton onClick={() => console.log('Меня удалительно нажали!!')} />
          </div>
        </div>
      </div>

    </div>
  );
};
export default Home;
