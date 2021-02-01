import React from "react";
import BackButton from "../helpers/BackButton";

const BackHeader = (props) => {
  return (
    <header style={{ display: "inline-block" }}>
      <BackButton />
      <h2 style={{ display: "inline-block" }}>{props.title}</h2>
    </header>
  );
};

export default BackHeader;
