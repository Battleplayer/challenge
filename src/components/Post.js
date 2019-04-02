import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchPost, postComment, deletePost } from "../redux/actions/Action";
import { StyledCard, StyledButton } from "./StyledComponents";
import Comments from "./Comments";

class Post extends Component {
	componentDidMount() {
		const { isPreview, match, fetchPost } = this.props;
		if (!isPreview && match.params.id) fetchPost(match.params.id);
	}

	componentDidUpdate(prevProps) {
		const { isAdded, fetchPost, match, isDeleted, history } = this.props;
		if (isAdded === true) {
			if (isAdded !== prevProps.isAdded) {
				fetchPost(match.params.id);
			}
		}
		if (isDeleted) {
			console.log("Post has been Deleted");
			history.push("/");
		}
	}

	deleteThisPost = () => {
		const { deletePost, match } = this.props;
		deletePost(match.params.id);
	};

	render() {
		const { isPreview, post, singlePost, match, history, postComment } = this.props;
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
										<h3>Topic&apos;s comments:</h3>
										<ul>
											{soloPost.comments &&
												soloPost.comments.map(comm => (
													<li key={comm.id}>
														{comm.body.comment} - says &quot;{comm.body.author}&quot;
													</li>
												))}
										</ul>
									</Fragment>
								) : (
									"It's quiet here, be the first to comment!"
								)}
								<Comments postComment={postComment} id={match.params.id} />
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

const mapStateToProps = ({ singlePost, isAdded, isDeleted }) => ({
	singlePost,
	isAdded,
	isDeleted,
});
const mapDispatchToProps = dispatcher =>
	bindActionCreators(
		{
			fetchPost,
			postComment,
			deletePost,
		},
		dispatcher
	);

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Post)
);
