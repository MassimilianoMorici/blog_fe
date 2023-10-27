import React from "react";
import { Button, Container, Dropdown, NavDropdown, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import useSession from "../../hooks/useSession";
import logoEpicode from "../../assets/logo epicode.png"

const NavBar = (props) => {

  const session = useSession()
  const navigate = useNavigate()

  const handleLogout = () => {
    // Rimuovi il token di autenticazione
    localStorage.removeItem('loggedInUser');
    navigate('/')
  }


  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">

        <Navbar.Brand as={Link} to="/home">
          <img className="blog-navbar-brand" alt="logo" src={logoEpicode} />
        </Navbar.Brand>


        <Container className="d-flex justify-content-end">

          <Button
            as={Link}
            to="/newBlogPost"
            className="blog-navbar-add-button bg-dark"
            size="lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
            </svg>
            Post Article
          </Button>

          <Dropdown className="ms-5">
            <Dropdown.Toggle variant="transparent" id="dropdown-basic" className="togli-bordo">
              <img src={`${session.avatar}`} alt="logo avatar" className="img-avatar" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <NavDropdown.Item className="selection" href="/home">Home</NavDropdown.Item>
              <NavDropdown.Item className="selection" href="/me">Account</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} className="selection" >Logout</NavDropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Container>
    </Navbar>
  );
};

export default NavBar;
