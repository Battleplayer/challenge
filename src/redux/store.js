import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import posts from "./reducers/Reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  posts
});

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
