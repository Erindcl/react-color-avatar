import { globalType } from './constant';
import { AvatarOption } from '../../types'

export const setAvatarOption = (data: AvatarOption) => (dispatch: any) => {
  dispatch({
    type: globalType.SET_AVATAR_OPTION,
    payload: data
  });
}
export const undo = () => (dispatch: any) => {
  dispatch({
    type: globalType.UNDO,
  });
}
export const redo = () => (dispatch: any) => {
  dispatch({
    type: globalType.REDO,
  });
}
