import { get } from 'lodash'
import { CREATE_ITEM, UPDATE_ITEM } from './actionTypes';

const initialState = {
  loading: true,
  byId: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case CREATE_ITEM: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [payload.id]: payload,
        }
      };
    }

    case UPDATE_ITEM: {
      const item = get(state, ['byId', payload.id]);
      return {
        ...state,
        byId: {
          ...state.byId,
          [payload.id]: {
            ...item,
            ...payload,
          }
        }
      };
    }

    default: {
      return state;
    }
  }
}
