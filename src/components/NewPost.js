import React, { Component } from "react";
import { StyledForm, StyledButton, StyledInput } from "./StyledComponents";
import { withRouter } from "react-router-dom";

import axios from "axios";

class NewPost extends Component {
  onInputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onChangeFileValue = e => {
    if (e.target.files && e.target.files[0]) {
      this.setState({
        image: URL.createObjectURL(e.target.files[0])
      });
    }
  };
  onChangeSetDate = () => {
    this.setState({ date: new Date().toLocaleDateString() });
  };
  onFormSubmit = e => {
    e.preventDefault();
    this.onChangeSetDate();
    setTimeout(() => {
      // this.postDaata(this.state);
      this.props.createNewPost(this.state);
      // this.props.history.push("/");
    }, 300);
  };

  postDaata = body => {
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
              onChange={this.onInputChangeHandler}
            />
          </label>
          <label htmlFor="title">
            Enter title
            <StyledInput
              id="title"
              name="title"
              onChange={this.onInputChangeHandler}
            />
          </label>
          <label htmlFor="body">
            <textarea
              name="body"
              id="body"
              onChange={this.onInputChangeHandler}
              style={{ width: "98%", height: "100px" }}
            />
          </label>
          <label htmlFor="image">
            Add file
            <input
              accept="image/*"
              type="file"
              id="image"
              name="image"
              onChange={this.onChangeFileValue}
            />
          </label>
          <StyledButton> Create </StyledButton>
        </StyledForm>
      </div>
    );
  }
}

export default withRouter(NewPost);
