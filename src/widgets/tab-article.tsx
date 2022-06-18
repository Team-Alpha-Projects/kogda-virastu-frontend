import React, { FC, useState } from 'react';
import styled from 'styled-components';
import FeedRibbon from './feed-ribbon';
import { TTabProps } from '../types/styles.types';
import SubscribedFeedRibbon from './subscribed-feed-ribbon';
import AdminFeedRibbon from './admin-feed-ribbon';

const TabsContainer = styled.div`
  overflow: hidden;
  width: 100%;
  margin-bottom: 33px;
`;

const Tab = styled.button`
  padding: 16px 8px;
  font-family: ${({ theme }) => theme.text18Sans.family};
  font-size: ${({ theme }) => theme.text18Sans.size}px;
  font-weight: ${({ theme }) => theme.text18Sans.weight};
  line-height: ${({ theme }) => theme.text18Sans.height}px;
  color: ${({ theme }) => theme.primaryText};
  border: 0;
  background-color: #fff;
  cursor: pointer;
`;

const TabAllPosts = styled(Tab)<TTabProps>`
  border-bottom: ${({ border }) => border};
`;

const TabMySubscriptions = styled(Tab)<TTabProps>`
  border-bottom: ${({ border }) => border};
`;

const TabAdmin = styled(Tab) <TTabProps>`
  border-bottom: ${({ border }) => border};
`;

const TabArticle: FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const togglTab = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <TabsContainer>
        <TabAllPosts border={activeTab === 1 ? '2px solid #008AFF' : 'none'} onClick={() => togglTab(1)}>Все посты</TabAllPosts>
        <TabMySubscriptions border={activeTab === 2 ? '2px solid #008AFF' : 'none'} onClick={() => togglTab(2)}>Мои подписки</TabMySubscriptions>
        <TabAdmin border={activeTab === 3 ? '2px solid #008AFF' : 'none'} onClick={() => togglTab(3)}>На модерации</TabAdmin>
      </TabsContainer>
      {activeTab === 1 && <FeedRibbon />}
      {activeTab === 2 && <SubscribedFeedRibbon />}
      {activeTab === 3 && <AdminFeedRibbon />}
    </>
  );
};
export default TabArticle;
