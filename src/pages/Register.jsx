import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import useRedirectIfAuthenticated from "../utils/hooks/useRedirectIfAuthenticated";
import { auth, db } from "../utils/firebase.js";
import Swal from "sweetalert2";

const RegisterPage = () => {
  useRedirectIfAuthenticated();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "Users", user.uid), {
        firstName,
        lastName,
        email: user.email,
        address,
        contactNumber,
        dateCreated: Timestamp.now(),
      });

      navigate("/");
    } catch (err) {
      console.log("error in creating a user :>>", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    }
    setLoading(false);
  };

  return (
    <Container className="mt-5">
      <h2>Register</h2>
      <Form onSubmit={handleRegister}>
        <Row className="mb-2">
          <Form.Group as={Col} controlId="formBasicEmail" md={6}>
            <Form.Label>Email address (required)</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formBasicPassword" md={6}>
            <Form.Label>Password (required, min. of 6 characters)</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-2">
          <Form.Group as={Col} controlId="formBasicFirstName" md={6}>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formBasicLastName" md={6}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicContactNumber">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter contact number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Button
          variant="primary"
          type="submit"
          disabled={loading || !(email && password && validateEmail(email))}
        >
          {loading ? "Loading..." : "Register"}
        </Button>
      </Form>

      <p className="mt-3">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </Container>
  );
};

export default RegisterPage;
