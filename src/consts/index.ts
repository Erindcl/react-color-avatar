import { AvatarSettings } from '../types'
import {
  BeardShape,
  ClothesShape,
  EarringsShape,
  EarShape,
  EyebrowsShape,
  EyesShape,
  FaceShape,
  Gender,
  GlassesShape,
  MouthShape,
  NoseShape,
  TopsShape,
  WrapperShape,
  WidgetType
} from '../enums'

export const NONE = 'none'

export const settingNames = {
  [WidgetType.Face]: '脸蛋',
  [WidgetType.Tops]: '头发 / 头饰',
  [WidgetType.Ear]: '耳朵',
  [WidgetType.Earrings]: '耳环',
  [WidgetType.Eyebrows]: '眉毛',
  [WidgetType.Eyes]: '眼睛',
  [WidgetType.Nose]: '鼻子',
  [WidgetType.Glasses]: '眼镜',
  [WidgetType.Mouth]: '嘴巴',
  [WidgetType.Beard]: '胡子',
  [WidgetType.Clothes]: '衣着',
}

export const SETTINGS: Readonly<AvatarSettings> = {
  gender: [Gender.Male, Gender.Female],

  wrapperShape: Object.values(WrapperShape),
  faceShape: Object.values(FaceShape),
  topsShape: Object.values(TopsShape),
  earShape: Object.values(EarShape),
  earringsShape: Object.values(EarringsShape),
  eyebrowsShape: Object.values(EyebrowsShape),
  eyesShape: Object.values(EyesShape),
  noseShape: Object.values(NoseShape),
  glassesShape: Object.values(GlassesShape),
  mouthShape: Object.values(MouthShape),
  beardShape: Object.values(BeardShape),
  clothesShape: Object.values(ClothesShape),

  backgroundColor: [
    '#6BD9E9',
    '#FC909F',
    '#F4D150',
    '#E0DDFF',
    '#D2EFF3',
    '#FFEDEF',
    '#FFEBA4',
    '#506AF4',
    '#F48150',
    '#48A99A',
    '#C09FFF',
    '#FD6F5D',
    'linear-gradient(45deg, #E3648C, #D97567)',
    'linear-gradient(62deg, #8EC5FC, #E0C3FC)',
    'linear-gradient(90deg, #ffecd2, #fcb69f)',
    'linear-gradient(120deg, #a1c4fd, #c2e9fb)',
    'linear-gradient(-135deg, #fccb90, #d57eeb)',
    'transparent',
  ],
  skinColor: ['#F9C9B6', '#AC6651'],
  clothesColor: ['#9287FF', '#6BD9E9', '#FC909F', '#F4D150', '#77311D'],
}

/** @internal */
type Data = Readonly<{
  [key in `${WidgetType}`]: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key in string]: () => Promise<any>
  }
}>

export const widgetData: Data = {
  [WidgetType.Face]: {
    [FaceShape.Base]: () => import(`../assets/widgets/face/base.svg`),
  },

  [WidgetType.Ear]: {
    [EarShape.Attached]: () => import(`../assets/widgets/ear/attached.svg`),
    [EarShape.Detached]: () => import(`../assets/widgets/ear/detached.svg`),
  },

  [WidgetType.Eyes]: {
    [EyesShape.Ellipse]: () => import(`../assets/widgets/eyes/ellipse.svg`),
    [EyesShape.Eyeshadow]: () =>
      import(`../assets/widgets/eyes/eyeshadow.svg`),
    [EyesShape.Round]: () => import(`../assets/widgets/eyes/round.svg`),
    [EyesShape.Smiling]: () => import(`../assets/widgets/eyes/smiling.svg`),
  },

  [WidgetType.Beard]: {
    [BeardShape.Scruff]: () => import(`../assets/widgets/beard/scruff.svg`),
  },

  [WidgetType.Clothes]: {
    [ClothesShape.Collared]: () =>
      import(`../assets/widgets/clothes/collared.svg`),
    [ClothesShape.Crew]: () => import(`../assets/widgets/clothes/crew.svg`),
    [ClothesShape.Open]: () => import(`../assets/widgets/clothes/open.svg`),
  },

  [WidgetType.Earrings]: {
    [EarringsShape.Hoop]: () =>
      import(`../assets/widgets/earrings/hoop.svg`),
    [EarringsShape.Stud]: () =>
      import(`../assets/widgets/earrings/stud.svg`),
  },

  [WidgetType.Eyebrows]: {
    [EyebrowsShape.Down]: () =>
      import(`../assets/widgets/eyebrows/down.svg`),
    [EyebrowsShape.Eyelashesdown]: () =>
      import(`../assets/widgets/eyebrows/eyelashesdown.svg`),
    [EyebrowsShape.Eyelashesup]: () =>
      import(`../assets/widgets/eyebrows/eyelashesup.svg`),
    [EyebrowsShape.Up]: () => import(`../assets/widgets/eyebrows/up.svg`),
  },

  [WidgetType.Glasses]: {
    [GlassesShape.Round]: () =>
      import(`../assets/widgets/glasses/round.svg`),
    [GlassesShape.Square]: () =>
      import(`../assets/widgets/glasses/square.svg`),
  },

  [WidgetType.Mouth]: {
    [MouthShape.Frown]: () => import(`../assets/widgets/mouth/frown.svg`),
    [MouthShape.Laughing]: () =>
      import(`../assets/widgets/mouth/laughing.svg`),
    [MouthShape.Nervous]: () =>
      import(`../assets/widgets/mouth/nervous.svg`),
    [MouthShape.Pucker]: () => import(`../assets/widgets/mouth/pucker.svg`),
    [MouthShape.Sad]: () => import(`../assets/widgets/mouth/sad.svg`),
    [MouthShape.Smile]: () => import(`../assets/widgets/mouth/smile.svg`),
    [MouthShape.Smirk]: () => import(`../assets/widgets/mouth/smirk.svg`),
    [MouthShape.Surprised]: () =>
      import(`../assets/widgets/mouth/surprised.svg`),
  },

  [WidgetType.Nose]: {
    [NoseShape.Curve]: () => import(`../assets/widgets/nose/curve.svg`),
    [NoseShape.Pointed]: () => import(`../assets/widgets/nose/pointed.svg`),
    [NoseShape.Round]: () => import(`../assets/widgets/nose/round.svg`),
  },

  [WidgetType.Tops]: {
    [TopsShape.Beanie]: () => import(`../assets/widgets/tops/beanie.svg`),
    [TopsShape.Clean]: () => import(`../assets/widgets/tops/clean.svg`),
    [TopsShape.Danny]: () => import(`../assets/widgets/tops/danny.svg`),
    [TopsShape.Fonze]: () => import(`../assets/widgets/tops/fonze.svg`),
    [TopsShape.Funny]: () => import(`../assets/widgets/tops/funny.svg`),
    [TopsShape.Pixie]: () => import(`../assets/widgets/tops/pixie.svg`),
    [TopsShape.Punk]: () => import(`../assets/widgets/tops/punk.svg`),
    [TopsShape.Turban]: () => import(`../assets/widgets/tops/turban.svg`),
    [TopsShape.Wave]: () => import(`../assets/widgets/tops/wave.svg`),
  },
}

export const previewData: Data = {
  [WidgetType.Face]: {
    [FaceShape.Base]: () => import(`../assets/preview/face/base.svg`),
  },

  [WidgetType.Ear]: {
    [EarShape.Attached]: () => import(`../assets/preview/ear/attached.svg`),
    [EarShape.Detached]: () => import(`../assets/preview/ear/detached.svg`),
  },

  [WidgetType.Eyes]: {
    [EyesShape.Ellipse]: () => import(`../assets/preview/eyes/ellipse.svg`),
    [EyesShape.Eyeshadow]: () =>
      import(`../assets/preview/eyes/eyeshadow.svg`),
    [EyesShape.Round]: () => import(`../assets/preview/eyes/round.svg`),
    [EyesShape.Smiling]: () => import(`../assets/preview/eyes/smiling.svg`),
  },

  [WidgetType.Beard]: {
    [BeardShape.Scruff]: () => import(`../assets/preview/beard/scruff.svg`),
  },

  [WidgetType.Clothes]: {
    [ClothesShape.Collared]: () =>
      import(`../assets/preview/clothes/collared.svg`),
    [ClothesShape.Crew]: () => import(`../assets/preview/clothes/crew.svg`),
    [ClothesShape.Open]: () => import(`../assets/preview/clothes/open.svg`),
  },

  [WidgetType.Earrings]: {
    [EarringsShape.Hoop]: () =>
      import(`../assets/preview/earrings/hoop.svg`),
    [EarringsShape.Stud]: () =>
      import(`../assets/preview/earrings/stud.svg`),
  },

  [WidgetType.Eyebrows]: {
    [EyebrowsShape.Down]: () =>
      import(`../assets/preview/eyebrows/down.svg`),
    [EyebrowsShape.Eyelashesdown]: () =>
      import(`../assets/preview/eyebrows/eyelashesdown.svg`),
    [EyebrowsShape.Eyelashesup]: () =>
      import(`../assets/preview/eyebrows/eyelashesup.svg`),
    [EyebrowsShape.Up]: () => import(`../assets/preview/eyebrows/up.svg`),
  },

  [WidgetType.Glasses]: {
    [GlassesShape.Round]: () =>
      import(`../assets/preview/glasses/round.svg`),
    [GlassesShape.Square]: () =>
      import(`../assets/preview/glasses/square.svg`),
  },

  [WidgetType.Mouth]: {
    [MouthShape.Frown]: () => import(`../assets/preview/mouth/frown.svg`),
    [MouthShape.Laughing]: () =>
      import(`../assets/preview/mouth/laughing.svg`),
    [MouthShape.Nervous]: () =>
      import(`../assets/preview/mouth/nervous.svg`),
    [MouthShape.Pucker]: () => import(`../assets/preview/mouth/pucker.svg`),
    [MouthShape.Sad]: () => import(`../assets/preview/mouth/sad.svg`),
    [MouthShape.Smile]: () => import(`../assets/preview/mouth/smile.svg`),
    [MouthShape.Smirk]: () => import(`../assets/preview/mouth/smirk.svg`),
    [MouthShape.Surprised]: () =>
      import(`../assets/preview/mouth/surprised.svg`),
  },

  [WidgetType.Nose]: {
    [NoseShape.Curve]: () => import(`../assets/preview/nose/curve.svg`),
    [NoseShape.Pointed]: () => import(`../assets/preview/nose/pointed.svg`),
    [NoseShape.Round]: () => import(`../assets/preview/nose/round.svg`),
  },

  [WidgetType.Tops]: {
    [TopsShape.Beanie]: () => import(`../assets/preview/tops/beanie.svg`),
    [TopsShape.Clean]: () => import(`../assets/preview/tops/clean.svg`),
    [TopsShape.Danny]: () => import(`../assets/preview/tops/danny.svg`),
    [TopsShape.Fonze]: () => import(`../assets/preview/tops/fonze.svg`),
    [TopsShape.Funny]: () => import(`../assets/preview/tops/funny.svg`),
    [TopsShape.Pixie]: () => import(`../assets/preview/tops/pixie.svg`),
    [TopsShape.Punk]: () => import(`../assets/preview/tops/punk.svg`),
    [TopsShape.Turban]: () => import(`../assets/preview/tops/turban.svg`),
    [TopsShape.Wave]: () => import(`../assets/preview/tops/wave.svg`),
  },
}
