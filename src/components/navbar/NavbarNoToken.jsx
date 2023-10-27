import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";
import logoEpicode from "../../assets/logo epicode.png"

const NavBarNoToken = (props) => {

    return (
        <Navbar expand="lg" className="blog-navbar" fixed="top">
            <Container className="justify-content-between">

                <Navbar.Brand as={Link} to="/">
                    <img className="blog-navbar-brand" alt="logo" src={logoEpicode} />
                </Navbar.Brand>

            </Container>
        </Navbar>
    );
};

export default NavBarNoToken;
