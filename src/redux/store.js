import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import posts from "./reducers/Reducer";
import singlePost from "./reducers/Reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  posts,
  singlePost
});

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
