import { createStore, applyMiddleware, compose } from "redux";

import posts from "./reducers/Reducer";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(posts, composeEnhancer(applyMiddleware(thunk)));
