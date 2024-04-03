import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { signOut } from "@firebase/auth";

import { auth } from "../utils/firebase";
import useAuth from "../utils/hooks/useAuth";

const Header = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("error in signing out :>> ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

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
            <Button variant="outline-primary" onClick={handleLogout}>
              Logout
            </Button>
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
