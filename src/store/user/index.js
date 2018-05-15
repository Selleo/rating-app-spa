import * as t from "./actionTypes";

const initialState = {
  email: "",
  first_name: "",
  last_name: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case t.STORE_USER: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
};
