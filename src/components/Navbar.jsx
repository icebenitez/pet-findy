import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "./useAuth"; // Assuming you have created the useAuth hook

const Header = () => {
  const { user } = useAuth();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* Logo on the left side */}
        <Navbar.Brand href="/">
          <h2>Pet findy</h2>
          {/* <img
            src="/logo.png" // Path to your logo image
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Your Logo"
          /> */}
        </Navbar.Brand>

        {/* Conditional button on the right side */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {user ? (
            // If user is authenticated, display logout button
            <Link to="/logout">
              <Button variant="outline-primary">Logout</Button>
            </Link>
          ) : (
            // If user is not authenticated, display login button
            <Link to="/login">
              <Button variant="outline-primary">Login</Button>
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
