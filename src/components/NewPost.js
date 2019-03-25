import React, { Component } from "react";
import { StyledForm, StyledButton, StyledInput } from "./StyledComponents";
import { withRouter } from "react-router-dom";
import { Prompt } from "react-router-dom";

import { fetchPost, createNewPost, editPost } from "../redux/actions/Action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";

class NewPost extends Component {
  state = {
    author: "",
    title: "",
    body: "",
    image: ""
  };
  isTextEdited = false;

  componentDidMount() {
    if (this.props.isEdit) {
      this.props.fetchPost(this.props.match.params.id);
      this.setState(this.props.singlePost);
    }
  }

  onInputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.isTextEdited = true;
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.setState({ date: new Date().toLocaleDateString() });
    this.isTextEdited = false;
    // setTimeout(() => {
    if (!this.props.isEdit) {
      this.submitNewPost(this.state);
    } else this.editPost(this.state, this.props.match.params.id);
    this.props.history.push("/");
    // }, 300);
  };

  submitNewPost = body => {
    axios
      .post("https://simple-blog-api.crew.red/posts", body, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };
  editPost = (body, id) => {
    axios
      .put(`https://simple-blog-api.crew.red/posts/${id}`, body, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  render() {
    console.log(this.isTextEdited);
    const { author, title, body, image } = this.state;
    return (
      <div>
        <Prompt
          when={this.isTextEdited}
          message={() => `You didn't store changes, really leave?`}
        />
        <StyledForm width={`400px`} onSubmit={this.onFormSubmit}>
          <label htmlFor="author">
            Enter author
            <StyledInput
              id="author"
              name="author"
              value={author}
              onChange={this.onInputChangeHandler}
            />
          </label>
          <label htmlFor="title">
            Enter title
            <StyledInput
              id="title"
              name="title"
              value={title}
              onChange={this.onInputChangeHandler}
            />
          </label>
          <label htmlFor="body">
            Enter more text!
            <textarea
              name="body"
              id="body"
              value={body}
              onChange={this.onInputChangeHandler}
              style={{ width: "98%", height: "100px" }}
            />
          </label>
          <label htmlFor="image">
            Add image link
            <StyledInput
              type="text"
              id="image"
              name="image"
              value={image}
              onChange={this.onInputChangeHandler}
            />
          </label>
          <StyledButton type="submit" color={`green`}>
            {this.props.isEdit ? "Edit" : "Create"}
          </StyledButton>
          <StyledButton type="button" onClick={this.props.history.goBack}>
            Return
          </StyledButton>
        </StyledForm>
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => ({
  ...posts
});
const mapDispatchToProps = dispatcher =>
  bindActionCreators(
    {
      fetchPost,
      createNewPost,
      editPost
    },
    dispatcher
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewPost)
);
