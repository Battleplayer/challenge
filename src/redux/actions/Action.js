import axios from "axios";

export const actionTypes = {
	REQUEST_START: "REQUEST_START",
	REQUEST_SUCCESS: "REQUEST_SUCCESS",
	REQUEST_ERROR: "REQUEST_ERROR",
	REQ_SINGLE_START: "REQ_SINGLE_START",
	REQ_SINGLE_SUCCESS: "REQ_SINGLE_SUCCESS",
	REQ_SINGLE_ERROR: "REQ_SINGLE_ERROR",
	CREATE_NEW_POST: "CREATE_NEW_POST",
	EDIT_EXISTED_POST: "EDIT_EXISTED_POST",
	ADD_COMMENT: "ADD_COMMENT",
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
	type: actionTypes.REQ_SINGLE_START,
});
export const requestSinglePostSuccess = singlePost => ({
	type: actionTypes.REQ_SINGLE_SUCCESS,
	payload: {
		singlePost,
	},
});
export const requestSinglePostError = singlePost => ({
	type: actionTypes.REQ_SINGLE_SUCCESS,
	payload: {
		singlePost,
	},
});

// CREATE POST
export const createPost = post => ({
	type: actionTypes.CREATE_NEW_POST,
	payload: {
		post,
	},
});

// EDIT POST
export const editExistedPost = post => ({
	type: actionTypes.EDIT_EXISTED_POST,
	payload: {
		post,
	},
});

// ADD COMMENT
export const addComment = singlePost => ({
	type: actionTypes.ADD_COMMENT,
	payload: {
		singlePost,
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
	dispatch(addComment());
	await axios
		.post(`https://simple-blog-api.crew.red/comments`, body, {
			headers: { "Content-Type": "application/json" },
		})
		.then(response => console.log(response))
		.catch(error => console.log(error));
};

export const createNewPost = body => async dispatch => {
	dispatch(createPost());
	await axios
		.post("https://simple-blog-api.crew.red/posts", body, {
			headers: { "Content-Type": "application/json" },
		})
		.then(response => console.log(response))
		.catch(error => console.log(error));
};

export const editPost = (body, id) => async dispatch => {
	dispatch(editExistedPost());
	await axios
		.put(`https://simple-blog-api.crew.red/posts/${id}`, body, {
			headers: { "Content-Type": "application/json" },
		})
		.then(response => console.log(response))
		.catch(error => console.log(error));
};
export const deletePost = id => {
	axios
		.delete(`https://simple-blog-api.crew.red/posts/${id}`)
		.then(response => console.log(response))
		.catch(error => console.log(error));
};
