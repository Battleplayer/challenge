import React, { Component } from "react";
import { StyledForm, StyledButton, StyledInput } from "./StyledComponents";

class NewPost extends Component {
  onChangeAuthorValue = e => {
    this.setState({ author: e.target.value });
  };
  onChangeTitleValue = e => {
    this.setState({ title: e.target.value });
  };
  onChangeFileValue = e => {
    if (e.target.files && e.target.files[0]) {
      this.setState({
        image: URL.createObjectURL(e.target.files[0])
      });
    }
  };
  onChangeBodyValue = e => {
    this.setState({ body: e.target.value });
  };
  onChangeSetDate = () => {
    this.setState({ date: new Date().toLocaleDateString() });
  };
  render() {
    const { createNewPost } = this.props;
    return (
      <div>
        <StyledForm
          width={`400px`}
          onSubmit={e => {
            e.preventDefault();
            this.onChangeSetDate();
            setTimeout(() => {
              console.log(this.state);
              createNewPost(this.state);
            }, 300);
          }}
        >
          <label htmlFor="author">
            Enter author
            <StyledInput
              id="author"
              name="author"
              onChange={this.onChangeAuthorValue}
            />
          </label>
          <label htmlFor="title">
            Enter title
            <StyledInput
              id="title"
              name="title"
              onChange={this.onChangeTitleValue}
            />
          </label>
          <label htmlFor="body">
            <textarea
              id="body"
              onChange={this.onChangeBodyValue}
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

export default NewPost;
