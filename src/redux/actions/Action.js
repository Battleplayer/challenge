import axios from "axios";

export const actionTypes = {
  REQUEST_START: "REQUEST_START",
  REQUEST_SUCCESS: "REQUEST_SUCCESS",
  REQUEST_ERROR: "REQUEST_ERROR",
  STORE_POSTS: "STORE_POSTS",
  ADD_POST: "ADD_POST"
};

export const requestStart = () => ({
  type: actionTypes.REQUEST_START
});
export const requestSuccess = posts => ({
  type: actionTypes.REQUEST_SUCCESS,
  payload: {
    posts
  }
});
export const requestError = error => ({
  type: actionTypes.REQUEST_ERROR,
  payload: {
    error
  }
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

export const newData = body => async dispatch => {
  dispatch(requestStart());
  console.log(body);
  await axios
    .post("https://simple-blog-api.crew.red/posts", body, {
      headers: { "Content-Type": "application/json" }
    })
    .then(response => console.log(response))
    .catch(error => console.log(error));
};
export const deleteData = id => {
  axios
    .delete(`https://simple-blog-api.crew.red/posts/${id}`)
    .then(response => console.log(response))
    .catch(error => console.log(error));
};
