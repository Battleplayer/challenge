import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchPost, postComment } from "../redux/actions/Action";
import { StyledCard, StyledButton } from "./StyledComponents";
import Comments from "./Comments";

class Post extends Component {
	state = {
		isCommentAdded: false,
	};

	componentDidMount() {
		const { isPreview, match, fetchPost } = this.props;
		if (!isPreview && match.params.id) fetchPost(match.params.id);
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { match, fetchPost } = this.props;
		if (nextState.isCommentAdded === true) {
			fetchPost(match.params.id);
			this.setState({ isCommentAdded: false });
			return true;
		}
		return false;
	}

	commentAdded = () => {
		this.setState({ isCommentAdded: true });
	};

	deleteThisPost = () => {
		const { deletePost, match, history } = this.props;
		deletePost(match.params.id);
		history.push("/");
	};

	render() {
		const { isPreview, post, singlePost, match, history } = this.props;
		const soloPost = !isPreview ? singlePost : post;
		return (
			<StyledCard className="post" isPreview={isPreview}>
				{isPreview ? (
					<Fragment>
						<img src={soloPost.image} alt="" />
						<h2>{soloPost.title}</h2>
					</Fragment>
				) : (
					<Fragment>
						<h2>{soloPost.title}</h2>
						<div>
							<img src={soloPost.image} alt="" />
							<div>
								<p>{soloPost.body}</p>
								<p>
									<span>{soloPost.author}</span> &nbsp;
									<span>{soloPost.date}</span>
								</p>
								{soloPost.comments && soloPost.comments.length ? (
									<Fragment>
										<h3>Topic's comments:</h3>
										<ul>{soloPost.comments && soloPost.comments.map(comm => <li key={comm.id}>{comm.body}</li>)}</ul>
									</Fragment>
								) : (
									"Its quit here, be the first to comment!"
								)}
								<Comments commentAdded={this.commentAdded} postComment={postComment} id={match.params.id} />
								<StyledButton onClick={history.goBack}>Return</StyledButton>
								<StyledButton color="red" onClick={this.deleteThisPost}>
									Delete
								</StyledButton>
							</div>
						</div>
					</Fragment>
				)}
			</StyledCard>
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
			postComment,
		},
		dispatcher
	);

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Post)
);
