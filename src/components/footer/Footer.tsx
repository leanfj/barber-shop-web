import React from "react";
import "./Footer.scss";

export default function Footer({ ...rest }): JSX.Element {
  return <footer className={"footer"} {...rest} />;
}
