import React, { Component, Fragment } from "react";

import { Switch, Route, withRouter } from "react-router-dom";
import LatestPostContainer from "./LatestPostContainer/LatestPostContainer";
import Post from "../components/Post";
import NewPost from "../components/NewPost";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { newData, deleteData, fetchData } from "../redux/actions/Action";

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
            render={() => <Post isPreview="" deletePost={deleteData} />}
          />
          <Route
            exact
            path="/new"
            render={() => <NewPost createNewPost={newData} />}
          />
          <Route render={() => <h2> Page not found</h2>} />
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
      deleteData,
      fetchData
    },
    dispatcher
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainContainer)
);
