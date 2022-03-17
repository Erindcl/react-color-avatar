import { AvatarOption, None } from '../types';
import { NONE, SETTINGS } from '../consts';
import {
  EarringsShape,
  GlassesShape,
  BeardShape,
  Gender,
  TopsShape,
} from '../enums';

export const createType = (keys: string[]) => {
  let obj: any = {};
  keys.forEach((item: string) => {
    obj[item] = item;
  })
  return obj;
}

/**
 * get a random value from an array
 * avoid 排除在外的元素集合
 * usually 增大选中概率的元素集合
 */
function getRandomValue<T = unknown>(
  arr: T[],
  {
    avoid = [],
    usually = [],
  }: { avoid?: unknown[]; usually?: (T | 'none')[] } = {}
): T {
  // 去除数组中为“假”的元素。 0、undefined、null、NaN、''、false
  // .filter(Boolean) 等价于 .filter((item) => {return Boolean(item)})
  const avoidValues = avoid.filter(Boolean)
  const filteredArr = arr.filter((it) => !avoidValues.includes(it))

  const usuallyValues = usually
    .filter(Boolean)
    .reduce<T[]>((acc, cur) => acc.concat(new Array(15).fill(cur)), [])

  const finalArr = filteredArr.concat(usuallyValues)

  const randomIdx = Math.floor(Math.random() * finalArr.length)
  const randomValue = finalArr[randomIdx]

  return randomValue
}

export function getRandomAvatarOption(
  presetOption: Partial<AvatarOption> = {},
  useOption: Partial<AvatarOption> = {}
): AvatarOption {
  const gender = getRandomValue(SETTINGS.gender)

  const beardList: BeardShape[] = []
  let topList: TopsShape[] = [TopsShape.Danny, TopsShape.Wave, TopsShape.Pixie]

  if (gender === Gender.Male) {
    beardList.push(BeardShape.Scruff)
    topList = SETTINGS.topsShape.filter((shape) => !topList.includes(shape))
  }

  const avatarOption: AvatarOption = {
    gender,

    wrapperShape:
      presetOption?.wrapperShape || getRandomValue(SETTINGS.wrapperShape),

    background: {
      color: getRandomValue(SETTINGS.backgroundColor, {
        avoid: [useOption.background?.color],
      }),
    },

    widgets: {
      face: {
        shape: getRandomValue(SETTINGS.faceShape),
      },
      tops: {
        shape: getRandomValue(topList, {
          avoid: [useOption.widgets?.tops?.shape],
        }),
      },
      ear: {
        shape: getRandomValue(SETTINGS.earShape, {
          avoid: [useOption.widgets?.ear?.shape],
        }),
      },
      earrings: {
        shape: getRandomValue<EarringsShape | None>(SETTINGS.earringsShape, {
          usually: [NONE],
        }),
      },
      eyebrows: {
        shape: getRandomValue(SETTINGS.eyebrowsShape, {
          avoid: [useOption.widgets?.eyebrows?.shape],
        }),
      },
      eyes: {
        shape: getRandomValue(SETTINGS.eyesShape, {
          avoid: [useOption.widgets?.eyes?.shape],
        }),
      },
      nose: {
        shape: getRandomValue(SETTINGS.noseShape, {
          avoid: [useOption.widgets?.nose?.shape],
        }),
      },
      glasses: {
        shape: getRandomValue<GlassesShape | None>(SETTINGS.glassesShape, {
          usually: [NONE],
        }),
      },
      mouth: {
        shape: getRandomValue(SETTINGS.mouthShape, {
          avoid: [useOption.widgets?.mouth?.shape],
        }),
      },
      beard: {
        shape: getRandomValue<BeardShape | None>(beardList, {
          usually: [NONE],
        }),
      },
      clothes: {
        shape: getRandomValue(SETTINGS.clothesShape, {
          avoid: [useOption.widgets?.clothes?.shape],
        }),
      },
    },
  }

  return avatarOption
}
