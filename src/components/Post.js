import React from "react";
import { StyledCard, StyledButton } from "./StyledComponents";

import { withRouter } from "react-router-dom";

const Post = props => {
  const { isPreview, post, postList } = props;
  let soloPost;
  if (!isPreview) {
    soloPost = postList.find(
      postic => postic.id === parseInt(props.match.params.id)
    );
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
        <StyledButton onClick={props.history.goBack}>Return</StyledButton>
      ) : (
        ""
      )}
      {!isPreview ? (
        <StyledButton
          color={`red`}
          onClick={() => props.deletePost(soloPost.id)}
        >
          Delete
        </StyledButton>
      ) : (
        ""
      )}
    </StyledCard>
  );
};

export default withRouter(Post);
