import { keyBy } from 'lodash'
import { FETCH_AGENDAS_LIST_REQUEST, FETCH_AGENDAS_LIST_SUCCESS } from "./actionTypes";

const initialState = {
  loading: false,
  byId: {},
};

export default (state = initialState, action)=> {
  const { type, payload } = action;

  switch (type) {
    case FETCH_AGENDAS_LIST_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case FETCH_AGENDAS_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        byId: {
          ...state.byId,
          ...keyBy(payload, 'id'),
        }
      }
    }

    default: {
      return state;
    }
  }
}
