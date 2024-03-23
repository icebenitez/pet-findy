import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase"; // Ensure db is initialized properly
import { Button, Container, Spinner } from "react-bootstrap";

const Pet = () => {
  const { userId, petId } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("pet :>> ", pet);
  }, [pet]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, `Users/${userId}/Pets/${petId}`),
      (snapshot) => {
        setPet(snapshot.data());
        setLoading(false);
      }
    );

    // Unsubscribe from the snapshot listener when the component unmounts
    return () => unsubscribe();
  }, [userId, petId]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!pet) {
    return <div>Pet not found.</div>;
  }

  return (
    <Container>
      <h2>Pet Details</h2>
      <div>
        <p>Name: {pet.name}</p>
        {pet.pictureUrl && (
          <div>
            <p>Picture:</p>
            <img src={pet.pictureUrl} alt="Pet" style={{ maxWidth: "200px" }} />
          </div>
        )}
        {pet.dateOfBirth && <p>Date of Birth: {pet.dateOfBirth}</p>}
        {/* Display other pet details here */}
      </div>
      <p>To edit this pet's details, you must be authenticated.</p>
      <Button as={Link} to={`/edit/${userId}/${petId}`} variant="primary">
        Edit
      </Button>
    </Container>
  );
};

export default Pet;
