import { globalType } from './constant';
import { AvatarOption } from '../../types'

interface IState {
  history: {
    past: AvatarOption[]
    present: AvatarOption
    future: AvatarOption[]
  }
}

const initialState: IState = {
  history: {
    past: [],
    present: {
      background: { color: 'red' },
      widgets: {}
    },
    future: [],
  }
};
 const globalReducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case globalType.SET_AVATAR_OPTION: {
      return Object.assign({}, state, {
        history: {
          past: [...state.history.past, state.history.present],
          present: payload,
          future: [],
        }
      });
    }
    case globalType.UNDO: {
      let length = state.history.past.length;
      if (length > 0) {
        const previous = state.history.past[length - 1]
        const newPast = state.history.past.slice(
          0,
          length - 1
        )
        return Object.assign({}, state, {
          history: {
            past: newPast,
            present: previous,
            future: [state.history.present, ...state.history.future],
          }
        });
      } else {
        return state
      }
    }
    case globalType.REDO: {
      if (state.history.future.length > 0) {
        const next = state.history.future[0]
        const newFuture = state.history.future.slice(1)
        return Object.assign({}, state, {
          history: {
            past: [...state.history.past, state.history.present],
            present: next,
            future: newFuture,
          }
        });
      } else {
        return state;
      }
    }
    default:
      return state;
  }
};
export default globalReducer;
