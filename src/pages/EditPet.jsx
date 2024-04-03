import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Container, Form, Button, Col, Row } from "react-bootstrap";

import {
  doc,
  updateDoc,
  onSnapshot,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { db, storage } from "../utils/firebase";
import useAuth from "../utils/hooks/useAuth";

const EditPetPage = () => {
  const uid = useOutletContext()?.user.uid;
  const { userId, petId } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    picture: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, `Users/${userId}/Pets/${petId}`),
      (snapshot) => {
        if (snapshot.exists()) {
          const petData = snapshot.data();
          setPet(petData);
          setFormData({
            name: petData.name,
            picture: petData.pictureUrl || "",
            dateOfBirth: petData?.dateOfBirth || "",
          });
          setLoading(false);
        }
      }
    );

    // Unsubscribe from the snapshot listener when the component unmounts
    return () => unsubscribe();
  }, [userId, petId]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "picture" ? e.target.files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Show loading Swal
      Swal.fire({
        title: "Editing Pet",
        html: "Please wait...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      let editedPetData = {};

      // Check each field in the formData
      for (const [key, value] of Object.entries(formData)) {
        if (key === "picture") continue;
        if (value !== pet[key]) {
          editedPetData[key] = value;
        }
      }

      // Log the edit in the 'Logs' subcollection
      await addDoc(collection(db, `Users/${userId}/Pets/${petId}/Logs`), {
        userId: uid, // Assuming you have access to the current user's ID
        timestamp: serverTimestamp(),
        payload: editedPetData,
      });

      // Upload pet image to Firebase Storage
      if (!formData?.picture) {
        const pictureRef = ref(
          storage,
          `users/${userId}/pets/${petId}/${new Date()}`
        );
        await uploadBytes(pictureRef, formData?.picture);
        editedPetData.pictureUrl = getDownloadURL(pictureRef);
      }

      // Update pet details
      await updateDoc(doc(db, `Users/${userId}/Pets/${petId}`), editedPetData);

      // Reset pet data for the next addition
      setFormData({
        picture: "",
        name: pet.name,
        dateOfBirth: pet.dateOfBirth,
      });

      // Show Swal alert with QR code
      Swal.fire({
        icon: "success",
        title: "Success!",
        showCancelButton: true,
        cancelButtonText: "Close",
      });
    } catch (error) {
      console.error("Error editing pet: ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred. Please try again later!",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pet) {
    return <div>Pet not found.</div>;
  }

  return (
    <Container>
      <h2>Edit Pet Details</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="formPetPicture">
              <Form.Label>Picture</Form.Label>
              <div>
                {pet.pictureUrl && (
                  <img
                    src={pet.pictureUrl}
                    alt="Pet"
                    style={{ maxWidth: "200px", marginBottom: "10px" }}
                  />
                )}
              </div>
              <Form.Control
                type="file"
                onChange={handleFormChange}
                name="picture"
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="formPetName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formPetDateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default EditPetPage;
