import React, { Component } from "react";
import { StyledButton } from "./StyledComponents";

class Comments extends Component {
  state = {
    comment: ""
  };
  onEnterCommentHandler = e =>
    this.setState({ [e.target.name]: e.target.value });
  render() {
    return (
      <div>
        <textarea
          name="comment"
          value={this.state.comment}
          onChange={this.onEnterCommentHandler}
        />
        <StyledButton>Add comment</StyledButton>
      </div>
    );
  }
}

export default Comments;
