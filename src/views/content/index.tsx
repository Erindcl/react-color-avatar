import React, { useEffect, useState } from 'react';
import iconBack from '../../assets/icons/icon-back.svg';
import iconNext from '../../assets/icons/icon-next.svg';
import iconFlip from '../../assets/icons/icon-flip.svg';
import { getRandomAvatarOption } from '../../utils';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { AvatarOption } from '../../types';
import { AVATAR_LAYER, widgetData, NONE } from '../../consts';
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
const avatarSize = 280;
const Content: React.FC<IProps> = ({ avatarOption, setAvatarOption, redo, undo }) => {
  const [ avatarSrc, setAvatarSrc ] = useState('');
  const [ isFlip, setIsFlip ] = useState(false);
  const [ downloading, setDownloading ] = useState(false);
  const [ avatarRef, setAvatarRef ] = useState<any>();
  useEffect(() => {
    (async() => {
      // render avatar
      if (!avatarOption) {
        return false;
      }
      const sortedList = Object.entries(avatarOption.widgets).sort(
        (i, ii) => {
          const ix = (AVATAR_LAYER as any)[i[0]]?.zIndex ?? 0
          const iix = (AVATAR_LAYER as any)[ii[0]]?.zIndex ?? 0
          return ix - iix
        }
      )
      const promises: Promise<string>[] = sortedList.map(
        async ([widgetType , opt]) => {
          if (opt.shape !== NONE && (widgetData as any)?.[widgetType]?.[opt.shape]) {
            return (await (widgetData as any)[widgetType][opt.shape]()).default
          }
          return ''
        }
      )
      const svgSrcList = await Promise.all(promises).then((raw) => {
        return raw
      })
      const getSvgContentPromises = svgSrcList.map(
        async (ele: string) => {
          if (ele) {
            return (await requestSvgContent(ele))
          }
          return ''
        }
      )
      const svgRawList = await Promise.all(getSvgContentPromises).then((raw) => {
        return raw.map((svgRaw: any, index) => {
          const content = svgRaw
            .slice(svgRaw.indexOf('>', svgRaw.indexOf('<svg')) + 1)
            .replace('</svg>', '')

          return `
            <g id="react-color-avatar-${sortedList[index][0]}">
              ${content}
            </g>
          `
        })
      })
      const svgContent = `
        <svg
          width="${avatarSize}"
          height="${avatarSize}"
          viewBox="0 0 ${avatarSize / 0.7} ${avatarSize / 0.7}"
          preserveAspectRatio="xMidYMax meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(100, 65)">
            ${svgRawList.join('')}
          </g>
        </svg>
      `;
      setAvatarSrc(svgContent);
    })()
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
        setIsFlip(!isFlip);
        break;
      }
      default:
        break;
    }
  }
  const requestSvgContent = (src: string) => {
    return fetch(src, {
      method: 'GET',
      headers: {
        'content-type': 'image/svg+xml'
      }
    })
    .then((response: any) => {
      if (response.status > 299) {
        throw new Error('Not found');
      }
      return response.text();
    })
    .then((content: string) => {
      return content
    })
    .catch((err: any) => {
      throw new Error(err);
    })
  }
  const handleDownload = async () => {
    try {
      setDownloading(true)
      if (avatarRef) {
        const html2canvas = (await import('html2canvas')).default
        const canvas = await html2canvas(avatarRef, {
          backgroundColor: null,
        })
        const dataURL = canvas.toDataURL()
  
        const trigger = document.createElement('a')
        trigger.href = dataURL
        trigger.download = 'vue-color-avatar.png'
        trigger.click()
      }
    } finally {
      setTimeout(() => {
        setDownloading(false);
      }, 1000)
    }
  }
  return (
    <div className="content-wrapper">
      <div ref={(instance: any) => setAvatarRef(instance)} className="avatar-wrapper">
        <div style={{ transform: `rotateY(${isFlip ? -180 : 0}deg)` }} className={`color-avatar ${avatarOption.wrapperShape}`}>
          <div style={{ background: avatarOption.background.color }} className="avatar-background"></div>
          <div className="avatar-payload" dangerouslySetInnerHTML={{ __html: avatarSrc }} ></div>
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
        <div onClick={handleDownload} className="action-download">{downloading ? '下载中...' : '下载头像'}</div>
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
