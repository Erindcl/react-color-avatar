import React from 'react';
import rightIcon from '../../assets/icons/icon-right.svg';
import './index.scss';

interface IProps {
  isCollapsed: boolean;
  editIsCollapsed: (isCollapsed: boolean) => void;
  children: any;
}

const Sider: React.FC<IProps> = ({ isCollapsed, editIsCollapsed, children }) => {

  const handleTriggerClick = () => {
    editIsCollapsed(!isCollapsed)
  }

  return (
    <div className={isCollapsed ? 'sider isCollapsed' : 'sider'}>
      {children}
      <div className="trigger" onClick={handleTriggerClick}>
        <img alt="trigger" src={rightIcon} />
      </div>
    </div>
  )
}

export default Sider
