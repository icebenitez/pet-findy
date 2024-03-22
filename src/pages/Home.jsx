import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Spinner,
} from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// import useDocOnSnapshot from "../utils/hooks/useDocOnSnapshot";
import useAuth from "../utils/hooks/useAuth";
import { db } from "../utils/firebase";
import { Link } from "react-router-dom";

const ReactSwal = withReactContent(Swal);

const MainPage = () => {
  const uid = useAuth()?.user?.uid;
  const [userDetails, setUserDetails] = useState({});
  const [userDetailsIsLoading, setUserDetailsIsLoading] = useState(true);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // console.log("docQuery :>>", docQuery);
    console.log("useEffect is running :>> ");
    const unsubscribe = onSnapshot(doc(db, "Users", `${uid}`), (snapshot) => {
      setUserDetails(snapshot.data());
      setUserDetailsIsLoading(false);
    });

    // Unsubscribe from the snapshot listener when the component unmounts
    return () => unsubscribe();
  }, [uid]);

  return (
    <Container className="mt-5">
      <h2>User Details</h2>
      {userDetailsIsLoading ? ( // If loading, display spinner
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

      {!userDetailsIsLoading && userDetails && (
        <>
          <h2 className="mt-4">Pets</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {pets?.map((pet, index) => (
              <Col key={index}>
                <Card>
                  <Card.Img variant="top" src={pet?.picture} />
                  <Card.Body>
                    <Card.Title>{pet?.name}</Card.Title>
                    <Card.Text>
                      <strong>Date of Birth:</strong> {pet?.dateOfBirth}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Button as={Link} variant="primary" className="mt-3" to="/pet/new">
            Add Pet
          </Button>
        </>
      )}
    </Container>
  );
};

export default MainPage;
