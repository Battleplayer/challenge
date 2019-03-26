import React, { Component } from "react";
import axios from "axios";
import { StyledButton } from "./StyledComponents";

class Comments extends Component {
	state = {
		comment: "",
	};

	onEnterCommentHandler = e => this.setState({ [e.target.name]: e.target.value });

	postComment = () => {
		const { commentAdded, id } = this.props;
		commentAdded();
		const body = { postId: parseInt(id, 0), body: this.state.comment };
		axios
			.post("https://simple-blog-api.crew.red/comments", body, {
				headers: { "Content-Type": "application/json" },
			})
			.then(response => console.log(response))
			.catch(error => console.log(error));
		this.setState({ comment: "" });
	};

	render() {
		return (
			<div>
				<textarea name="comment" value={this.state.comment} onChange={this.onEnterCommentHandler} />
				<StyledButton onClick={this.postComment}>Add comment</StyledButton>
			</div>
		);
	}
}

export default Comments;
