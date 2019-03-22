import React, { Component } from "react";
import Post from "../../components/Post";
import { connect } from "react-redux";
import { fetchData } from "../../redux/actions/Action";
import { bindActionCreators } from "redux";
import { withRouter, Link } from "react-router-dom";

class LatestPostContainer extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const { posts } = this.props;
    return (
      <div className="postsList">
        {posts &&
          posts.map(post => (
            <div className="postsList__item" key={post.id}>
              <Link exact="true" to={`/posts/${post.id}`}>
                <Post isPreview="1" post={post} />
              </Link>
              <Link
                className="postsList__edit"
                exact="true"
                to={`/edit/${post.id}`}
              >
                Edit post
              </Link>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => ({
  ...posts
});
const mapDispatchToProps = dispatcher =>
  bindActionCreators(
    {
      fetchData
    },
    dispatcher
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LatestPostContainer)
);
