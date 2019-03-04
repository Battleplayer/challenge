import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
      }}
    >
      <h1>
        <Link to="/"> Home</Link>
      </h1>
      <Link to="/new">Create new post</Link>
    </div>
  );
};
