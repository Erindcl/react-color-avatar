import React from 'react';
import { SETTINGS } from '../../consts';
import './index.scss';

// const settingConfig: any[] = [
//   {
//     title: '脸蛋',
//     key: 'face',
//     options: [
//       { key: '', src: '' }
//     ]
//   }
// ];

const SideBar: React.FC = () => {

  return (
    <div className="side-bar">
      <div className="setting-card">
        <div className="setting-card-title">头像形状</div>
        <ul className="setting-card-options">
          {SETTINGS.wrapperShape.map(ele => {
            return (
              <li key={ele} className="wrapper-shape-item">
                <span className={ false ? `shape ${ele} active` : `shape ${ele}` }></span>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="setting-card">
        <div className="setting-card-title">背景颜色</div>
        <ul className="setting-card-options">
          {SETTINGS.backgroundColor.map(ele => {
            return (
              <li key={ele} className="bg-color-item">
                <span style={{ background: ele }} className={`bg-color ${false ? 'active' : null} ${ele === 'transparent' ? 'empty' : null}`}></span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default SideBar
