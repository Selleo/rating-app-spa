import * as t from "./actionTypes";
import axios from "../../client";

const initialState = {
  email: "",
  first_name: "",
  last_name: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case t.STORE_USER: {
      axios.defaults.headers.common["Authorization"] = action.payload.token;
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
};
