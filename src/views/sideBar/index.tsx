import React, { useEffect, useState } from 'react';
import { SETTINGS, previewData, NONE, settingNames } from '../../consts';
import { WidgetType, WrapperShape } from '../../enums';
import { WidgetShape, AvatarOption } from '../../types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { setAvatarOption } from "../../store/global/action";
import './index.scss';

interface IWidget {
  widgetType: WidgetType
  widgetShape: WidgetShape
  svgRaw: string
}
interface ISections {
  widgetType: WidgetType
  widgetList: IWidget[]
}

interface IProps {
  avatarOption: AvatarOption;
  setAvatarOption: (data: AvatarOption) => void;
}

const SideBar: React.FC<IProps> = ({ avatarOption, setAvatarOption }) => {
  const sectionList: WidgetType[] = Object.values(WidgetType);
  const [sections, setSections] = useState<ISections[]>([]);

  useEffect(() => {
    (async () => {
      const allWidgets = await Promise.all(
        sectionList.map((item) => {
          return getWidgets(item)
        })
      )
  
      let newSections = sectionList.map((ele, index) => {
        return {
          widgetType: ele,
          widgetList: allWidgets[index],
        }
      })
      setSections(newSections);
    })()
  })

  useEffect(() => {
    console.log('sideBar--------------------------')
    console.log(avatarOption)
  }, [avatarOption])

  const setWrapperShape = (value: WrapperShape) =>  {
    if (value === avatarOption.wrapperShape) {
      return false;
    }
    console.log(value)
    // setAvatarOption({ ...avatarOption, wrapperShape: value })
  }

  const setBgColor = (value: string) =>  {
    if (value === avatarOption.background?.color) {
      return false;
    }
    // setAvatarOption({
    //   ...avatarOption,
    //   background: {
    //     ...avatarOption.background,
    //     color: value
    //   }
    // })
  }

  const setWidgets = (type: WidgetType, value: WidgetShape) =>  {
    if (!value || !avatarOption.widgets?.[type] || avatarOption.widgets?.[type]?.shape === value) {
      return false;
    }
    // setAvatarOption({
    //   ...avatarOption,
    //   widgets: {
    //     ...avatarOption.widgets,
    //     [type]: {
    //       ...(avatarOption.widgets?.[type] || {}),
    //       shape: value
    //     }
    //   }
    // })
  }

  const getWidgets = async (widgetType: WidgetType) => {
    const shapeList = SETTINGS[`${widgetType}Shape`];
    const promises: Promise<string>[] = shapeList.map(async (ele: string) => {
      if (ele !== NONE && previewData?.[widgetType]?.[ele]) {
        return (await previewData[widgetType][ele]()).default
      }
      return 'X'
    })
    const svgRawList = await Promise.all(promises).then((values) => {
      return values.map((svgRaw, index) => {
        return {
          widgetType,
          widgetShape: shapeList[index],
          svgRaw
        }
      })
    })
    return svgRawList
  }

  return (
    <div className="side-bar">
      <div className="setting-card">
        <div className="setting-card-title">头像形状</div>
        <ul className="setting-card-options">
          {SETTINGS.wrapperShape.map(ele => {
            return (
              <li onClick={() => setWrapperShape(ele)} key={ele} className="wrapper-shape-item">
                <span className={ avatarOption.wrapperShape === ele ? `shape ${ele} active` : `shape ${ele}` }></span>
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
              <li onClick={() => setBgColor(ele)} key={ele} className="bg-color-item">
                <span style={{ background: ele }} className={`bg-color ${avatarOption.background?.color === ele ? 'active' : null} ${ele === 'transparent' ? 'empty' : null}`}></span>
              </li>
            )
          })}
        </ul>
      </div>
      {sections.map((ele) => {
        return (
          <div className="setting-card" key={ele.widgetType}>
            <div className="setting-card-title">{settingNames[ele.widgetType]}</div>
            <ul className="setting-card-options">
              {ele.widgetList.map(eleChild => {
                return (
                  <li  onClick={() => setWidgets(ele.widgetType, eleChild.widgetShape)} key={eleChild.widgetShape} className={`widget-item ${avatarOption.widgets?.[ele.widgetType]?.shape === eleChild.widgetShape ? 'selected' : null}`}>
                    {eleChild.widgetShape === NONE ?
                      <span>X</span>
                      : <img alt={eleChild.widgetShape} src={eleChild.svgRaw} />
                    }
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default connect(
  (state: any) => ({
    avatarOption: state.global.history.present
  }),
  (dispatch: any) => bindActionCreators({ setAvatarOption }, dispatch)
)(SideBar)
