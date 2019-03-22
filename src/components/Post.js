import React, { Component, Fragment } from "react";
import { StyledCard, StyledButton } from "./StyledComponents";
import Comments from "./Comments";

import { withRouter } from "react-router-dom";
import { fetchPost, postComment } from "../redux/actions/Action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Post extends Component {
  componentDidMount() {
    if (!this.props.isPreview && this.props.match.params.id)
      this.props.fetchPost(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.isRequestInProgress !== this.props.isRequestInProgress &&
      // nextProps.singlePost.comments !== this.props.singlePost.comments &&
      !this.props.isPreview
    ) {
      this.props.fetchPost(this.props.match.params.id);
    }
  }

  deleteThisPost = () => {
    this.props.deletePost(this.props.match.params.id);
    this.props.history.push("/");
  };

  render() {
    const { isPreview, post, singlePost } = this.props;
    let soloPost = !isPreview ? singlePost : post;
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
                    <ul>
                      {soloPost.comments &&
                        soloPost.comments.map(comm => (
                          <li key={comm.id}>{comm.body}</li>
                        ))}
                    </ul>
                  </Fragment>
                ) : (
                  "Its quit here, be the first to comment!"
                )}
                <Comments
                  postComment={postComment}
                  id={this.props.match.params.id}
                />
                <StyledButton onClick={this.props.history.goBack}>
                  Return
                </StyledButton>
                <StyledButton color={`red`} onClick={this.deleteThisPost}>
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

const mapStateToProps = ({ posts }) => ({
  ...posts
});
const mapDispatchToProps = dispatcher =>
  bindActionCreators(
    {
      fetchPost,
      postComment
    },
    dispatcher
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Post)
);
