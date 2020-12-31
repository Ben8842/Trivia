import ActionTypes from "../actions/types.js";

const initialState = {
  userName: null,
  data: null,
  isLoggedIn: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOG_IN:
      return {
        userName: action.payload.username,
        data: action.payload,
        isLoggedIn: true,
      };
    case ActionTypes.LOG_OUT:
      return initialState;

    default:
      return state;
  }
};
