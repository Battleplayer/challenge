import React, { Component } from "react";
import { StyledButton } from "./StyledComponents";
import axios from "axios";

class Comments extends Component {
  state = {
    comment: ""
  };

  onEnterCommentHandler = e =>
    this.setState({ [e.target.name]: e.target.value });
  postComment = () => {
    this.props.commentAdded();
    let body = { postId: parseInt(this.props.id), body: this.state.comment };
    axios
      .post("https://simple-blog-api.crew.red/comments", body, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
    this.setState({ comment: "" });
  };

  render() {
    return (
      <div>
        <textarea
          name="comment"
          value={this.state.comment}
          onChange={this.onEnterCommentHandler}
        />
        <StyledButton onClick={this.postComment}>Add comment</StyledButton>
      </div>
    );
  }
}

export default Comments;
