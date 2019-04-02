import React, { Component, Fragment } from "react";

import { Switch, Route, withRouter } from "react-router-dom";
import LatestPostContainer from "./LatestPostContainer/LatestPostContainer";
import Post from "../components/Post";
import NewPost from "../components/NewPost";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchData } from "../redux/actions/Action";

class MainContainer extends Component {
	componentDidMount() {
		this.props.fetchData();
	}

	render() {
		// 	// console.log(this.props);
		return (
			<Fragment>
				<Switch>
					<Route exact path="/" component={LatestPostContainer} />
					<Route exact path="/posts/:id" render={() => <Post isPreview="" />} />
					<Route exact path="/edit/:id" render={() => <NewPost isEdit="true" />} />
					<Route exact path="/new" render={() => <NewPost />} />
					<Route render={() => <h2> Page not found</h2>} />
				</Switch>
			</Fragment>
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
	)(MainContainer)
);
