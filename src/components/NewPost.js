import React, { Component } from "react";
import { StyledForm, StyledButton, StyledInput } from "./StyledComponents";
import { withRouter } from "react-router-dom";

import axios from "axios";

class NewPost extends Component {
  state = {
    author: "",
    title: "",
    body: "",
    image: ""
  };

  onInputChangeHandler = e =>
    this.setState({ [e.target.name]: e.target.value });

  onFormSubmit = e => {
    e.preventDefault();
    this.setState({ date: new Date().toLocaleDateString() });
    setTimeout(() => {
      this.submitNewPost(this.state);
      this.props.history.push("/");
    }, 300);
  };

  submitNewPost = body => {
    console.log(body);
    axios
      .post("https://simple-blog-api.crew.red/posts", body, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <StyledForm width={`400px`} onSubmit={this.onFormSubmit}>
          <label htmlFor="author">
            Enter author
            <StyledInput
              id="author"
              name="author"
              value={this.state.author}
              onChange={this.onInputChangeHandler}
            />
          </label>
          <label htmlFor="title">
            Enter title
            <StyledInput
              id="title"
              name="title"
              value={this.state.title}
              onChange={this.onInputChangeHandler}
            />
          </label>
          <label htmlFor="body">
            Enter more text!
            <textarea
              name="body"
              id="body"
              value={this.state.body}
              onChange={this.onInputChangeHandler}
              style={{ width: "98%", height: "100px" }}
            />
          </label>
          <label htmlFor="image">
            Add image link
            <StyledInput
              //  accept="image/*"
              type="text"
              id="image"
              name="image"
              value={this.state.image}
              onChange={this.onInputChangeHandler}
            />
          </label>
          <StyledButton> Create </StyledButton>
        </StyledForm>
      </div>
    );
  }
}

export default withRouter(NewPost);
