import React from "react";
import { Container } from "react-bootstrap";

const Footer = (props) => {
  return (
    <footer
      style={{
        paddingTop: 50,
        paddingBottom: 50,
      }}
    >
      <Container>{`${new Date().getFullYear()} - © Epicode | Developed for homework projects. Massimiliano Morici`}</Container>
    </footer>
  );
};

export default Footer;
