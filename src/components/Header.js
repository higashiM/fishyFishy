import React from "react";
import logo from "../header.png";

const Header = props => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        The goal is to get the most fish! Your highest score: {props.maxFish}{" "}
        fish
      </p>
    </header>
  );
};

export default Header;
