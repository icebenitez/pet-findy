import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Spinner,
} from "react-bootstrap";
import { doc } from "firebase/firestore";

import useDocOnSnapshot from "../utils/hooks/useDocOnSnapshot";
import useAuth from "../utils/hooks/useAuth";
import { db } from "../utils/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ReactSwal = withReactContent(Swal);

const MainPage = () => {
  const { user } = useAuth();
  const { data: userDetails, loading } = useDocOnSnapshot(
    doc(db, "Users", `${user?.uid}`)
  );

  // Sample pet data for testing
  const [petData, setPetData] = useState({
    picture: "",
    name: "",
    dateOfBirth: "",
    vaccines: "",
  });

  const openAddPetPopup = () => {
    ReactSwal.fire({
      title: "Add Pet",
      html: (
        <Form>
          <Form.Group className="mb-3" controlId="formPetPicture">
            <Form.Label>Pet Picture</Form.Label>
            <Form.Control
              type="file"
              name="picture"
              onChange={handlePetDataChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPetName">
            <Form.Label>Pet Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={petData.name}
              onChange={handlePetDataChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPetDateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={petData.dateOfBirth}
              onChange={handlePetDataChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPetVaccines">
            <Form.Label>Vaccines</Form.Label>
            <Form.Control
              type="text"
              name="vaccines"
              value={petData.vaccines}
              onChange={handlePetDataChange}
            />
          </Form.Group>
        </Form>
      ),
      showCancelButton: true,
      confirmButtonText: "Add Pet",
      showLoaderOnConfirm: true,
      preConfirm: () => handleAddPet(),
    });
  };

  // Function to handle adding a new pet
  const handleAddPet = () => {
    const { picture, name, dateOfBirth, vaccines } = petData;
    // Validate pet data
    if (!picture || !name || !dateOfBirth || !vaccines) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all fields!",
      });
      return;
    }

    // Create a new pet object
    const newPet = { ...petData };
    // setUserDetails((prevState) => ({
    //   ...prevState,
    //   pets: [...prevState.pets, newPet],
    // }));
    // Reset pet data for the next addition
    setPetData({
      picture: "",
      name: "",
      dateOfBirth: "",
      vaccines: "",
    });
    // Close the SweetAlert popup
    Swal.close();
  };

  // Function to handle input changes for pet data
  const handlePetDataChange = (e) => {
    const { name, value } = e.target;
    setPetData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Container className="mt-5">
      <h2>User Details</h2>
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

            <Button variant="primary" className="mb-3">
              Edit Profile
            </Button>
          </>
        )
      )}

      {!loading && userDetails && (
        <>
          <h2 className="mt-4">Pets</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {userDetails?.pets?.map((pet, index) => (
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

          <Button variant="primary" className="mt-3" onClick={openAddPetPopup}>
            Add Pet
          </Button>
        </>
      )}
    </Container>
  );
};

export default MainPage;
