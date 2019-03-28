import { actionTypes } from "../actions/Action";

const defaultState = {
	isRequestInProgress: false,
	posts: [],
	error: "",
	singlePost: {},
};
const reducer = (state = defaultState, { type = "", payload = {} }) => {
	switch (type) {
		case actionTypes.REQUEST_START:
			return {
				...state,
				isRequestInProgress: true,
			};
		case actionTypes.REQUEST_SUCCESS:
			return {
				...state,
				isRequestInProgress: false,
				posts: payload.posts,
			};
		case actionTypes.REQUEST_ERROR:
			return {
				...state,
				isRequestInProgress: false,
				error: payload.error,
			};
		case actionTypes.REQ_SINGLE_START:
			return {
				...state,
				isRequestInProgress: false,
			};
		case actionTypes.REQ_SINGLE_SUCCESS:
			return {
				...state,
				isRequestInProgress: false,
				singlePost: payload.singlePost,
			};
		case actionTypes.REQ_SINGLE_ERROR:
			return {
				...state,
				isRequestInProgress: false,
				error: payload.error,
			};

		case actionTypes.CREATE_NEW_POST:
			return {
				...state,
				posts: [...state.posts, payload.post],
			};
		case actionTypes.EDIT_EXISTED_POST:
			return {
				...state,
				posts: { ...state.posts, ...payload },
			};
		case actionTypes.ADD_COMMENT:
			return {
				...state,
				payload,
			};

		default:
			return state;
	}
};
export default reducer;
