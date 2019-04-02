import { actionTypes } from "../actions/Action";

const defaultState = {
	isRequestInProgress: false,
	posts: [],
	error: "",
	singlePost: {},
	isDeleted: "",
	isAdded: "",
	postEdited: "",
	postCreated: "",
};
const reducer = (state = defaultState, { type = "", payload = {} }) => {
	switch (type) {
		case actionTypes.REQUEST_START:
			return {
				...state,
				postCreated: "",
				postEdited: "",
				isDeleted: "",
				isAdded: "",
				error: "",
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
		case actionTypes.SINGLE_POST_REQ_START:
			return {
				...state,
				isRequestInProgress: false,
			};
		case actionTypes.SINGLE_POST_REQ_SUCCESS:
			return {
				...state,
				isRequestInProgress: false,
				singlePost: payload.singlePost,
			};
		case actionTypes.SINGLE_POST_REQ_ERROR:
			return {
				...state,
				isRequestInProgress: false,
				error: payload.error,
			};
		case actionTypes.CREATE_POST_REQ_START:
			return {
				...state,
				postCreated: "",
				isRequestInProgress: true,
			};
		case actionTypes.CREATE_POST_REQ_SUCCESS:
			return {
				...state,
				postCreated: true,
				posts: [...state.posts, payload.post],
			};
		case actionTypes.CREATE_POST_REQ_ERROR:
			return {
				...state,
				postCreated: false,
				isRequestInProgress: false,
				error: payload.error,
			};
		case actionTypes.EDIT_POST_REQ_START:
			return {
				...state,
				isRequestInProgress: true,
				postEdited: "pending",
			};
		case actionTypes.EDIT_POST_REQ_SUCCESS:
			return {
				...state,
				posts: [...state.posts],
				postEdited: true,
			};
		case actionTypes.EDIT_POST_REQ_ERROR:
			return {
				...state,
				postEdited: false,
				isRequestInProgress: false,
				error: payload.error,
			};
		case actionTypes.DELETE_POST_REQ_START:
			return {
				...state,
				isDeleted: "",
				isRequestInProgress: true,
			};
		case actionTypes.DELETE_POST_REQ_SUCCESS:
			return {
				...state,
				payload,
				isDeleted: true,
			};
		case actionTypes.DELETE_POST_REQ_ERROR:
			return {
				...state,
				isRequestInProgress: false,
				error: payload.error,
				isDeleted: false,
			};
		case actionTypes.ADD_COMMENT_REQ_START:
			return {
				...state,
				isAdded: "pending",
				isRequestInProgress: true,
			};
		case actionTypes.ADD_COMMENT_REQ_SUCCESS:
			return {
				...state,
				isAdded: true,
				payload,
			};
		case actionTypes.ADD_COMMENT_REQ_ERROR:
			return {
				...state,
				isRequestInProgress: false,
				isAdded: false,
				error: payload.error,
			};
		default:
			return state;
	}
};
export default reducer;
