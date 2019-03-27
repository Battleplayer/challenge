import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { fetchData } from "../../redux/actions/Action";
import Post from "../../components/Post";
import Loading from "../../components/Loading";

class LatestPostContainer extends Component {
	componentDidMount() {
		this.props.fetchData();
	}

	render() {
		// console.log(this.props);
		const { posts } = this.props;
		if (!posts) {
			return <Loading />;
		}
		return (
			<div className="postsList">
				{posts &&
					posts.map(post => (
						<div className="postsList__item" key={post.id}>
							<Link exact="true" to={`/posts/${post.id}`}>
								<Post isPreview="1" post={post} />
							</Link>
							<Link className="postsList__edit" exact="true" to={`/edit/${post.id}`}>
								Edit post
							</Link>
						</div>
					))}
			</div>
		);
	}
}

const mapStateToProps = ({ posts }) => ({
	posts,
});
const mapDispatchToProps = dispatcher =>
	bindActionCreators(
		{
			fetchData,
		},
		dispatcher
	);

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(LatestPostContainer)
);
