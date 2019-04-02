import axios from "axios";

export const actionTypes = {
	REQUEST_START: "REQUEST_START",
	REQUEST_SUCCESS: "REQUEST_SUCCESS",
	REQUEST_ERROR: "REQUEST_ERROR",
	SINGLE_POST_REQ_START: "SINGLE_POST_REQ_START",
	SINGLE_POST_REQ_SUCCESS: "SINGLE_POST_REQ_SUCCESS",
	SINGLE_POST_REQ_ERROR: "SINGLE_POST_REQ_ERROR",
	CREATE_POST_REQ_START: "CREATE_POST_REQ_START",
	CREATE_POST_REQ_SUCCESS: "CREATE_POST_REQ_SUCCESS",
	CREATE_POST_REQ_ERROR: "CREATE_POST_REQ_ERROR",
	EDIT_POST_REQ_START: "EDIT_POST_REQ_START",
	EDIT_POST_REQ_SUCCESS: "EDIT_POST_REQ_SUCCESS",
	EDIT_POST_REQ_ERROR: "EDIT_POST_REQ_ERROR",
	DELETE_POST_REQ_START: "DELETE_POST_REQ_START",
	DELETE_POST_REQ_SUCCESS: "DELETE_POST_REQ_SUCCESS",
	DELETE_POST_REQ_ERROR: "DELETE_POST_REQ_ERROR",
	ADD_COMMENT_REQ_START: "ADD_COMMENT_REQ_START",
	ADD_COMMENT_REQ_SUCCESS: "ADD_COMMENT_REQ_SUCCESS",
	ADD_COMMENT_REQ_ERROR: "ADD_COMMENT_REQ_ERROR",
};
// ALL POSTS
export const requestStart = () => ({
	type: actionTypes.REQUEST_START,
});
export const requestSuccess = posts => ({
	type: actionTypes.REQUEST_SUCCESS,
	payload: {
		posts,
	},
});
export const requestError = error => ({
	type: actionTypes.REQUEST_ERROR,
	payload: {
		error,
	},
});

// SINGLE POST REQ
export const requestSinglePost = () => ({
	type: actionTypes.SINGLE_POST_REQ_START,
});
export const requestSinglePostSuccess = singlePost => ({
	type: actionTypes.SINGLE_POST_REQ_SUCCESS,
	payload: {
		singlePost,
	},
});
export const requestSinglePostError = error => ({
	type: actionTypes.SINGLE_POST_REQ_ERROR,
	payload: {
		error,
	},
});

// CREATE POST
export const requestCreatePost = () => ({
	type: actionTypes.CREATE_POST_REQ_START,
});
export const requestCreatePostSuccess = post => ({
	type: actionTypes.CREATE_POST_REQ_SUCCESS,
	payload: {
		post,
	},
});
export const requestCreatePostError = error => ({
	type: actionTypes.CREATE_POST_REQ_ERROR,
	payload: {
		error,
	},
});

// EDIT POST
export const requestEditPost = () => ({
	type: actionTypes.EDIT_POST_REQ_START,
});
export const requestEditPostSuccess = payload => ({
	type: actionTypes.EDIT_POST_REQ_SUCCESS,
	payload,
});
export const requestEditPostError = error => ({
	type: actionTypes.EDIT_POST_REQ_ERROR,
	payload: {
		error,
	},
});

// ADD COMMENT
export const requestAddComment = () => ({
	type: actionTypes.ADD_COMMENT_REQ_START,
});
export const requestAddCommentSuccess = comment => ({
	type: actionTypes.ADD_COMMENT_REQ_SUCCESS,
	payload: {
		comment,
	},
});
export const requestAddCommentError = error => ({
	type: actionTypes.ADD_COMMENT_REQ_ERROR,
	payload: {
		error,
	},
});

// DELETE POST
export const requestDeletePost = () => ({
	type: actionTypes.DELETE_POST_REQ_START,
});
export const requestDeletePostSuccess = id => ({
	type: actionTypes.DELETE_POST_REQ_SUCCESS,
	payload: {
		id,
	},
});
export const requestDeletePostError = error => ({
	type: actionTypes.DELETE_POST_REQ_ERROR,
	payload: {
		error,
	},
});

export const fetchData = () => async dispatch => {
	dispatch(requestStart());
	await axios
		.get("https://simple-blog-api.crew.red/posts")
		.then(({ data }) => {
			dispatch(requestSuccess(data));
		})
		.catch(({ message }) => dispatch(requestError(message)));
};
export const fetchPost = id => async dispatch => {
	dispatch(requestSinglePost());
	await axios
		.get(`https://simple-blog-api.crew.red/posts/${id}?_embed=comments`)
		.then(({ data }) => {
			dispatch(requestSinglePostSuccess(data));
		})
		.catch(({ message }) => dispatch(requestSinglePostError(message)));
};
export const postComment = body => async dispatch => {
	dispatch(requestAddComment());
	await axios
		.post(`https://simple-blog-api.crew.red/comments`, body, {
			headers: { "Content-Type": "application/json" },
		})
		.then(({ data }) => {
			dispatch(requestAddCommentSuccess(data));
		})
		.catch(({ message }) => dispatch(requestAddCommentError(message)));
};

export const createNewPost = body => async dispatch => {
	dispatch(requestCreatePost());
	await axios
		.post("https://simple-blog-api.crew.red/posts", body, {
			headers: { "Content-Type": "application/json" },
		})
		.then(({ data }) => {
			dispatch(requestCreatePostSuccess(data));
		})
		.catch(({ message }) => dispatch(requestCreatePostError(message)));
};

export const editPost = (body, id) => async dispatch => {
	dispatch(requestEditPost());
	await axios
		.put(`https://simple-blog-api.crew.red/posts/${id}`, body, {
			headers: { "Content-Type": "application/json" },
		})
		.then(({ data }) => {
			dispatch(requestEditPostSuccess(data));
		})
		.catch(({ message }) => dispatch(requestEditPostError(message)));
};
export const deletePost = id => async dispatch => {
	dispatch(requestDeletePost());
	axios
		.delete(`https://simple-blog-api.crew.red/posts/${id}`)
		.then(({ data }) => {
			dispatch(requestDeletePostSuccess(data));
		})
		.catch(({ message }) => dispatch(requestDeletePostError(message)));
};
