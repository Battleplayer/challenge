import React, { Component } from "react";
import { StyledCard, StyledButton } from "./StyledComponents";

import { withRouter } from "react-router-dom";
import { fetchPost } from "../redux/actions/Action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Post extends Component {
  componentDidMount() {
    if (!this.props.isPreview) {
      console.log("12");
      this.props.fetchPost(this.props.match.params.id);
    }
  }

  render() {
    // console.log(this.props);
    const { isPreview, post, singlePost, posts } = this.props;
    let soloPost;
    console.log(this.props);
    if (!isPreview) {
      console.log(this.props);
      soloPost = singlePost;
      console.log(soloPost);
    } else soloPost = post;

    return (
      <StyledCard className="post" isPreview={isPreview}>
        <img src={soloPost.image} alt="" />
        <h2>{soloPost.title}</h2>
        {!isPreview ? <p>{soloPost.body}</p> : ""}{" "}
        {!isPreview ? (
          <p>
            <span>{soloPost.author}</span> &nbsp;
            <span>{soloPost.date}</span>
          </p>
        ) : (
          ""
        )}
        {!isPreview ? (
          <StyledButton onClick={this.props.history.goBack}>
            Return
          </StyledButton>
        ) : (
          ""
        )}
        {!isPreview ? (
          <StyledButton
            color={`red`}
            onClick={() => this.props.deletePost(soloPost.id)}
          >
            Delete
          </StyledButton>
        ) : (
          ""
        )}
      </StyledCard>
    );
  }
}
const mapStateToProps = ({ posts }) => {
  return posts;
};
const mapDispatchToProps = dispatcher =>
  bindActionCreators(
    {
      fetchPost
    },
    dispatcher
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Post)
);
