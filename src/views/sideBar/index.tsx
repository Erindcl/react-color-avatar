import React, { useEffect, useState } from 'react';
import { SETTINGS, previewData, NONE, settingNames } from '../../consts';
import { WidgetType } from '../../enums';
import { WidgetShape } from '../../types';
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

const SideBar: React.FC = () => {
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
      {sections.map((ele) => {
        return (
          <div className="setting-card" key={ele.widgetType}>
            <div className="setting-card-title">{settingNames[ele.widgetType]}</div>
            <ul className="setting-card-options">
              {ele.widgetList.map(eleChild => {
                return (
                  <li key={eleChild.widgetShape} className={`widget-item ${false ? 'selected' : null}`}>
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

export default SideBar
