import React from "react";
import BackButton from "../helpers/BackButton";
import './BackHeader.scss';

const BackHeader = (props) => {
  return (
    <header>
      <BackButton />
      <h2>{props.title}</h2>
    </header>
  );
};

export default BackHeader;
