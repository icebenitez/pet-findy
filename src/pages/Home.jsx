import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Spinner,
  Stack,
} from "react-bootstrap";
import { Link, useOutletContext } from "react-router-dom";
import { collection, doc, onSnapshot } from "firebase/firestore";

import { db } from "../utils/firebase";

const Home = () => {
  const { user } = useOutletContext();
  const [userDetails, setUserDetails] = useState({});
  const [userDetailsIsLoading, setUserDetailsIsLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [petsAreLoading, setPetsAreLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, `Users/${user?.uid}`),
      (snapshot) => {
        setUserDetails(snapshot.data());
        setUserDetailsIsLoading(false);
      }
    );

    // Unsubscribe from the snapshot listener when the component unmounts
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, `Users/${user?.uid}/Pets`),
      (snapshot) => {
        const petsArr = [];
        snapshot.forEach((doc) => {
          petsArr.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setPets(petsArr);
        setPetsAreLoading(false);
      }
    );

    // Unsubscribe from the snapshot listener when the component unmounts
    return () => unsubscribe();
  }, [user]);

  return (
    <Container className="mt-5">
      <Stack direction="horizontal" gap={3}>
        <h2>User Details</h2>
        <Button variant="primary" className="mb-3 ms-auto">
          Edit Profile
        </Button>
      </Stack>

      {userDetailsIsLoading ? ( // If loading, display spinner
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Row gap={3} direction="horizontal">
            <Col md="6">
              <p>
                Full Name: {userDetails.firstName} {userDetails.lastName}
              </p>
            </Col>
            <Col md="6">
              <p>Contact Number: {userDetails.contactNumber}</p>
            </Col>
          </Row>
          <p>Address: {userDetails.address}</p>
        </>
      )}

      {!userDetailsIsLoading &&
        userDetails &&
        !petsAreLoading &&
        pets.length > 0 && (
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
              {pets?.map((pet) => (
                <Col key={pet.id}>
                  <Link to={`${uid}/pets/${pet?.id}`}>
                    <Card>
                      <Card.Img variant="top" src={pet?.pictureUrl} />
                      <Card.Body>
                        <Card.Title>{pet?.name}</Card.Title>
                        <Card.Text>
                          <strong>Date of Birth:</strong> {pet?.dateOfBirth}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </>
        )}
    </Container>
  );
};

export default Home;
