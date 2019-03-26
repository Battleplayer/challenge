import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<nav className="headerNav">
			<h1>
				<Link to="/"> Home</Link>
			</h1>
			<Link to="/new">Create new post</Link>
		</nav>
	);
};
export default Header;
