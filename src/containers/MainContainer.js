import React, { Component, Fragment } from "react";

import { Switch, Route, withRouter } from "react-router-dom";
import LatestPostContainer from "./LatestPostContainer/LatestPostContainer";
import Post from "../components/Post";
import NewPost from "../components/NewPost";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { newData, deleteData } from "../redux/actions/Action";

class MainContainer extends Component {
  render() {
    console.log(this.props.posts);
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={LatestPostContainer} />
          <Route
            exact
            path="/posts/:id"
            render={() => (
              <Post
                isPreview=""
                deletePost={deleteData}
                postList={this.props.posts}
              />
            )}
          />
          <Route
            exact
            path="/new"
            render={() => <NewPost createNewPost={newData} />}
          />
        </Switch>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ posts }) => ({
  ...posts
});
const mapDispatchToProps = dispatcher =>
  bindActionCreators(
    {
      newData,
      deleteData
    },
    dispatcher
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainContainer)
);
