import { actionTypes } from "../actions/Action";

const defaultState = {
  isRequestInProgress: false,
  posts: [],
  error: "",
  singlePost: {}
};
const reducer = (state = defaultState, { type = "", payload = {} }) => {
  switch (type) {
    case actionTypes.REQUEST_START:
      return {
        ...state,
        isRequestInProgress: true
      };
    case actionTypes.REQUEST_SUCCESS:
      return {
        ...state,
        isRequestInProgress: false,
        posts: payload.posts
      };
    case actionTypes.REQ_SINGLE_POST:
      return {
        ...state,
        isRequestInProgress: false,
        singlePost: payload.singlePost
      };
    case actionTypes.REQUEST_ERROR:
      return {
        ...state,
        isRequestInProgress: false,
        error: payload.error
      };

    default:
      return state;
  }
};
export default reducer;
