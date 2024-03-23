import React, { useState, useEffect } from "react";
import { doc } from "firebase/firestore";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Spinner,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import useDocOnSnapshot from "../utils/hooks/useDocOnSnapshot";
import useAuth from "../utils/hooks/useAuth";
import { db } from "../utils/firebase";

const MainPage = () => {
  const uid = useAuth()?.user.uid;
  const { data: userDetails, loading } = useDocOnSnapshot(
    doc(db, "Users", `${uid}`)
  );
  const [pets, setPets] = useState([]);

  return (
    <Container className="mt-5">
      <Stack direction="horizontal" gap={3}>
        <h2>User Details</h2>
        <Button variant="primary" className="mb-3 ms-auto">
          Edit Profile
        </Button>
      </Stack>

      {loading ? ( // If loading, display spinner
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        userDetails && ( // If userDetails is not null, display user details
          <>
            <p>First Name: {userDetails.firstName}</p>
            <p>Last Name: {userDetails.lastName}</p>
            <p>Address: {userDetails.address}</p>
            <p>Contact Number: {userDetails.contactNumber}</p>
          </>
        )
      )}

      {!loading && userDetails && (
        <>
          <Stack direction="horizontal" gap={3}>
            <h2 className="mt-4">Pets</h2>
            <Button
              variant="primary"
              className="mt-3 ms-auto"
              as={Link}
              to="/pet/new"
            >
              Add Pet
            </Button>
          </Stack>

          <Row xs={1} md={2} lg={3} className="g-4">
            {pets?.map((pet, index) => (
              <Col key={index}>
                <Card>
                  <Card.Img variant="top" src={pet?.picture} />
                  <Card.Body>
                    <Card.Title>{pet?.name}</Card.Title>
                    <Card.Text>
                      <strong>Date of Birth:</strong> {pet?.dateOfBirth}
                      <br />
                      <strong>Vaccines:</strong> {pet?.vaccines}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default MainPage;
