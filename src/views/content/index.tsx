import React, { useEffect, useState } from 'react';
import iconBack from '../../assets/icons/icon-back.svg';
import iconNext from '../../assets/icons/icon-next.svg';
import iconFlip from '../../assets/icons/icon-flip.svg';
import { getRandomAvatarOption } from '../../utils';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { AvatarOption } from '../../types';
import * as globalAction from "../../store/global/action";
import './index.scss';

interface IProps {
  avatarOption: AvatarOption;
  setAvatarOption: (data: AvatarOption) => void;
  undo: () => void;
  redo: () => void;
}
interface IMenu {
  title: string;
  src: string;
  key: string;
}
const menuList: IMenu[] = [
  { title: '撤销', src: iconBack, key: 'undo' },
  { title: '还原', src: iconNext, key: 'redo' },
  { title: '水平翻转', src: iconFlip, key: 'flip' },
]
const Content: React.FC<IProps> = ({ avatarOption, setAvatarOption, redo, undo }) => {
  const [ avatarSrc, setAvatarSrc ] = useState('');
  useEffect(() => {
    console.log('content:------------------')
    console.log(avatarOption)
  }, [avatarOption])
  const handleSetAvatar = () => {
    const present = getRandomAvatarOption();
    setAvatarOption(present);
  }
  const handleMenuClick = (type: string) => {
    switch (type) {
      case 'redo': {
        redo();
        break;
      }
      case 'undo': {
        undo();
        break;
      }
      case 'flip': {
        break;
      }
      default:
        break;
    }
  }
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
            <li onClick={() => handleMenuClick(ele.key)} key={ele.key} title={ele.title}>
              <img alt={ele.title} src={ele.src} />
            </li>
          )
        })}
      </ul>
      <div className="action-wrapper">
        <div onClick={handleSetAvatar} className="action-randomize">随机生成</div>
        <div className="action-download">下载头像</div>
      </div>
    </div>
  )
}

export default connect(
  (state: any) => ({
    avatarOption: state.global.history.present
  }),
  (dispatch: any) => bindActionCreators({ ...globalAction }, dispatch)
)(Content)
