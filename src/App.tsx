import React, { useState, useEffect } from 'react';
import Container from './layout/container';
import Sider from './layout/sider';
import Header from './layout/header';
import Footer from './layout/footer';
import SideBar from './views/sideBar';
import Content from './views/content';
import './styles/App.scss';

const App: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
  })

  const editIsCollapsed = (flg: boolean) => {
    setIsCollapsed(flg)
  }

  return (
    <div className="main">
      <Container isCollapsed={isCollapsed}>
        <Header />
        <Content />
        <Footer />
      </Container>
      <Sider isCollapsed={isCollapsed} editIsCollapsed={editIsCollapsed}>
        <SideBar />
      </Sider>
    </div>
  )
}

export default App
