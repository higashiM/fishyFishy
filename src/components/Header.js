import React from "react";
import logo from "../header.png";

const Header = props => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>Highest Score: {props.maxFish} fish</p>
    </header>
  );
};

export default Header;
