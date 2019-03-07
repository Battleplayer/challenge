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
    const styleDiv = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      flexWrap: "wrap"
    };
    const styleLink = {
      flex: "0 0 30%"
    };
    const { posts } = this.props;
    return (
      <div style={styleDiv}>
        {posts &&
          posts.map(post => (
            <Link
              style={styleLink}
              key={post.id}
              exact="true"
              to={`/posts/${post.id}`}
            >
              <Post isPreview="1" post={post} />
            </Link>
          ))}
      </div>
    );
  }
}

const mapStateToProps = store => {
  const posts = store.posts;
  return posts;
};
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
