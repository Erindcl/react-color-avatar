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
} from '../enums'

export type None = 'none'

export type WidgetShape =
  FaceShape
  | TopsShape
  | EarShape
  | EarringsShape
  | EyebrowsShape
  | EyesShape
  | NoseShape
  | MouthShape
  | BeardShape
  | GlassesShape
  | ClothesShape

interface Widget<Shape> {
  shape: Shape | None
  zIndex?: number
  fillColor?: string
  strokeColor?: string
}

type AvatarWidgets = {
  face: Widget<FaceShape>
  tops: Widget<TopsShape>
  ear: Widget<EarShape>
  earrings: Widget<EarringsShape>
  eyebrows: Widget<EyebrowsShape>
  glasses: Widget<GlassesShape>
  eyes: Widget<EyesShape>
  nose: Widget<NoseShape>
  mouth: Widget<MouthShape>
  beard: Widget<BeardShape>
  clothes: Widget<ClothesShape>
}

export interface AvatarOption {
  gender?: Gender

  wrapperShape?: `${WrapperShape}`

  background: {
    color: string
  }

  // Partial 快速将 AvatarWidgets 中的属性转为可选的
  widgets: Partial<AvatarWidgets>
}

export interface AvatarSettings {
  gender: [Gender, Gender]

  wrapperShape: WrapperShape[]
  faceShape: FaceShape[]
  topsShape: TopsShape[]
  earShape: EarShape[]
  earringsShape: EarringsShape[]
  eyebrowsShape: EyebrowsShape[]
  eyesShape: EyesShape[]
  noseShape: NoseShape[]
  mouthShape: MouthShape[]
  beardShape: BeardShape[]
  glassesShape: GlassesShape[]
  clothesShape: ClothesShape[]

  backgroundColor: string[]
  skinColor: string[]
  clothesColor: string[]
}
