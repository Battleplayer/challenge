import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MainContainer from "./containers/MainContainer";



class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Header />
					<MainContainer />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
