import React from 'react';
import './index.scss';

interface IProps {
  isCollapsed: boolean;
  children: any;
}

const Container: React.FC<IProps> = ({ isCollapsed, children }) => {

  return (
    <div className={isCollapsed ? 'container full' : 'container'}>
      {children}
    </div>
  )
}

export default Container

