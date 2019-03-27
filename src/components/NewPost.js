import React, { Component } from "react";
import { withRouter, Prompt } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchPost, createNewPost, editPost } from "../redux/actions/Action";
import { StyledForm, StyledButton, StyledInput } from "./StyledComponents";

class NewPost extends Component {
	state = {
		author: "",
		title: "",
		body: "",
		image: "",
	};

	isTextEdited = false;

	componentDidMount() {
		const { isEdit, fetchPost, match, singlePost } = this.props;
		if (isEdit === "true") {
			fetchPost(match.params.id);
			this.setState(singlePost);
		}
	}

	onInputChangeHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
		this.isTextEdited = true;
	};

	onFormSubmit = e => {
		const { isEdit, match, createNewPost, editPost } = this.props;
		e.preventDefault();
		this.setState({ date: new Date().toLocaleDateString() });
		this.isTextEdited = false;
		setTimeout(() => {
			if (!isEdit) {
				createNewPost(this.state);
			} else editPost(this.state, match.params.id);
			// history.goBack;
		}, 300);
	};

	render() {
		// console.log(this.props);
		const { author, title, body, image } = this.state;
		return (
			<div>
				<Prompt when={this.isTextEdited} message={() => `You didn't store changes, really leave?`} />
				<StyledForm width="400px" onSubmit={this.onFormSubmit}>
					<label htmlFor="author">
						Enter author
						<StyledInput id="author" name="author" value={author} onChange={this.onInputChangeHandler} />
					</label>
					<label htmlFor="title">
						Enter title
						<StyledInput id="title" name="title" value={title} onChange={this.onInputChangeHandler} />
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
						<StyledInput type="text" id="image" name="image" value={image} onChange={this.onInputChangeHandler} />
					</label>
					<StyledButton type="submit" color="green">
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

const mapStateToProps = ({ singlePost }) => ({
	singlePost,
});
const mapDispatchToProps = dispatcher =>
	bindActionCreators(
		{
			fetchPost,
			createNewPost,
			editPost,
		},
		dispatcher
	);

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(NewPost)
);
