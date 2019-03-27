import axios from "axios";

export const actionTypes = {
	REQUEST_START: "REQUEST_START",
	REQUEST_SUCCESS: "REQUEST_SUCCESS",
	REQUEST_ERROR: "REQUEST_ERROR",
	REQ_SINGLE_POST: "REQ_SINGLE_POST",
	CREATE_NEW_POST: "CREATE_NEW_POST",
	EDIT_EXISTED_POST: "EDIT_EXISTED_POST",
	ADD_COMMENT: "ADD_COMMENT",
};

export const requestStart = () => ({
	type: actionTypes.REQUEST_START,
});
export const requestSuccess = posts => ({
	type: actionTypes.REQUEST_SUCCESS,
	payload: {
		posts,
	},
});
export const requestSinglePost = singlePost => ({
	type: actionTypes.REQ_SINGLE_POST,
	payload: {
		singlePost,
	},
});
export const requestError = error => ({
	type: actionTypes.REQUEST_ERROR,
	payload: {
		error,
	},
});
export const createPost = post => ({
	type: actionTypes.CREATE_NEW_POST,
	payload: {
		post,
	},
});
export const editExistedPost = post => ({
	type: actionTypes.EDIT_EXISTED_POST,
	payload: {
		post,
	},
});
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
	dispatch(requestStart());
	await axios
		.get(`https://simple-blog-api.crew.red/posts/${id}?_embed=comments`)
		.then(({ data }) => {
			dispatch(requestSinglePost(data));
		})
		.catch(({ message }) => dispatch(requestError(message)));
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
