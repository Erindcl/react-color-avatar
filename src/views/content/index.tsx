import React, { useState } from 'react';
import iconBack from '../../assets/icons/icon-back.svg';
import iconRedo from '../../assets/icons/icon-next.svg';
import iconFlip from '../../assets/icons/icon-flip.svg';
import './index.scss';

interface IMenu {
  title: string;
  src: string;
}
const menuList: IMenu[] = [
  { title: '撤销', src: iconBack },
  { title: '还原', src: iconRedo },
  { title: '水平翻转', src: iconFlip },
]
const Content: React.FC = () => {
  const [ avatarSrc, setAvatarSrc ] = useState('');
  return (
    <div className="content-wrapper">
      <div className="avatar-wrapper">
        <div className={`color-avatar circle`}>
          <div style={{ backgroundColor: 'blue' }} className="avatar-background"></div>
          <img alt="avatar" src={avatarSrc} className="avatar-payload" />
        </div>
      </div>
      <ul className="menu-wrapper">
        {menuList.map((ele: IMenu) => {
          return (
            <li key={ele.title} title={ele.title}>
              <img alt={ele.title} src={ele.src} />
            </li>
          )
        })}
      </ul>
      <div className="action-wrapper">
        <div className="action-randomize">随机生成</div>
        <div className="action-download">下载头像</div>
      </div>
    </div>
  )
}

export default Content
