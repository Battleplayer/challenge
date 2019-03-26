import React, { Component } from "react";
import axios from "axios";
import { StyledButton, StyledInput } from "./StyledComponents";

class Comments extends Component {
	state = {
		comment: "",
		author: "anonim"
	};

	onEnterCommentHandler = e => this.setState({ [e.target.name]: e.target.value });

	postComment = () => {
		const { commentAdded, id } = this.props;
		const {comment, author} = this.state;
		commentAdded();
		const body = { postId: parseInt(id, 0), body: {comment, author }};
		axios
			.post("https://simple-blog-api.crew.red/comments", body, {
				headers: { "Content-Type": "application/json" },
			})
			.then(response => console.log(response))
			.catch(error => console.log(error));
		this.setState({ comment: "" });
	};

	render() {
		const {comment, author} = this.state;
		return (
			<div>
				<textarea name="comment" value={comment} onChange={this.onEnterCommentHandler} />
				<StyledInput name="author" value={author} onChange={this.onEnterCommentHandler} />
				<StyledButton onClick={this.postComment}>Add comment</StyledButton>
			</div>
		);
	}
}

export default Comments;
