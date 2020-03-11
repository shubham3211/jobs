import React from "react";
import "./Loader.css"

const Loader = () => (
  <div id="wave">
    <span className="dot" />
    <span className="dot" />
    <span className="dot" />
    <br />
    <span>Loading...</span>
  </div>
);

export default Loader;