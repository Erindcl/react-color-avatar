import React, { useEffect, useState } from 'react';
import iconBack from '../../assets/icons/icon-back.svg';
import iconNext from '../../assets/icons/icon-next.svg';
import iconFlip from '../../assets/icons/icon-flip.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { AvatarOption } from '../../types'
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
}
const menuList: IMenu[] = [
  { title: '撤销', src: iconBack },
  { title: '还原', src: iconNext },
  { title: '水平翻转', src: iconFlip },
]
const Content: React.FC<IProps> = ({ avatarOption }) => {
  const [ avatarSrc, setAvatarSrc ] = useState('');
  useEffect(() => {
    console.log(avatarOption)
  })
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

export default connect(
  (state: any) => ({
    avatarOption: state.global.history.present
  }),
  (dispatch: any) => bindActionCreators({ ...globalAction }, dispatch)
)(Content)
