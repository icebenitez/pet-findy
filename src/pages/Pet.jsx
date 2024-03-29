import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase"; // Ensure db is initialized properly
import { Button, Container, Spinner } from "react-bootstrap";
import useAuth from "../utils/hooks/useAuth";

// http://localhost:5173/TpdzAvzbU0OKeiHck6NoRK1lPG32/pets/4ZT1jVt6C7D8S1pPnRFX

const Pet = () => {
  const { userId, petId } = useParams();
  const { user } = useAuth();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

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
      {user ? (
        <p>To edit this pet's details, you must be authenticated.</p>
      ) : null}

      <Button as={Link} to={user ? "edit" : "../login"}>
        Edit
      </Button>
    </Container>
  );
};

export default Pet;
