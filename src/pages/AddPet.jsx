import { useState } from "react";
import { useNavigate } from "react-router";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Form, Button, Container, Stack, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import QRCode from "qrcode";

import { db, storage } from "../utils/firebase"; // Import your Firebase configuration
import useAuth from "../utils/hooks/useAuth";

const base_url = window.location.origin;

const AddPetPage = () => {
  const navigate = useNavigate();
  const userId = useAuth()?.user.uid;
  const [petData, setPetData] = useState({
    picture: "",
    name: "",
    dateOfBirth: "",
    contactDetails: "",
    address: "",
  });

  const handleAddPet = async () => {
    const { picture, name, dateOfBirth, contactDetails, address } = petData;

    // Validate pet data
    if (!picture || !name) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all fields!",
      });
      return;
    }

    try {
      // Show loading Swal
      Swal.fire({
        title: "Adding Pet",
        html: "Please wait...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Add the new pet to Firestore
      const petRef = await addDoc(collection(db, `Users/${userId}/Pets`), {
        name,
        dateOfBirth,
        createdAt: serverTimestamp(), // Firestore server timestamp
        contactDetails,
        address,
      });

      // Upload pet image to Firebase Storage
      const pictureRef = ref(
        storage,
        `users/${userId}/pets/${petRef.id}/${new Date()}`
      );
      await uploadBytes(pictureRef, picture);

      // Generate QR code for the pet
      const url = `${userId}/pets/${petRef.id}`;

      // Generate URL for the pet page
      const petUrl = `${base_url}/${url}`;
      const qrCodeImage = await QRCode.toDataURL(petUrl);

      // Upload QR code image to Firebase Storage
      const qrCodeRef = ref(
        storage,
        `users/${userId}/pets/${petRef.id}/qrcode`
      );
      await uploadBytes(qrCodeRef, qrCodeImage);

      // Update the pet document with the picture URL and QR code URL
      await updateDoc(petRef, {
        pictureUrl: await getDownloadURL(pictureRef),
        qrCodeUrl: await getDownloadURL(qrCodeRef),
      });

      // Reset pet data for the next addition
      setPetData({
        picture: "",
        name: "",
        dateOfBirth: "",
        contactDetails: "",
        address: "",
      });

      // Show Swal alert with QR code
      Swal.fire({
        icon: "success",
        title: "Success!",
        html: `<img src="${qrCodeImage}" alt="QR Code" style="max-width: 100%;">`,
        showCancelButton: true,
        cancelButtonText: "Close",
        confirmButtonText: "Download QR Code",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          // Trigger download of QR code
          const downloadLink = document.createElement("a");
          downloadLink.href = qrCodeImage;
          downloadLink.download = "pet_qr_code.png";
          downloadLink.click();
        }
      });
    } catch (error) {
      console.error("Error adding pet: ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred. Please try again later!",
      });
    }
  };

  const handlePetDataChange = (e) => {
    const { name, value } = e.target;
    setPetData((prevState) => ({
      ...prevState,
      [name]: name === "picture" ? e.target.files[0] : value,
    }));
  };

  return (
    <Container className="mt-5">
      <Stack direction="horizontal" gap={3}>
        <h2>Add Pet</h2>
        <Button
          className="ms-auto"
          variant="primary"
          type="button"
          onClick={() => navigate("/")}
        >
          Home
        </Button>
      </Stack>

      <Form>
        <Form.Group className="mb-3" controlId="formPetPicture">
          <Form.Label>Pet Picture</Form.Label>
          <Form.Control
            type="file"
            name="picture"
            onChange={handlePetDataChange}
            accept="image/png, image/gif, image/jpeg"
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
        <Row className="mb-2">
          <Form.Group as={Col} className="mb-3" controlId="formPetDateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={petData.dateOfBirth}
              onChange={handlePetDataChange}
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="contactDetails">
            <Form.Label>Contact Details</Form.Label>
            <Form.Control
              name="contactDetails"
              type="text"
              placeholder="Enter contact details"
              value={petData.contactDetails}
              onChange={handlePetDataChange}
              required
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            name="address"
            type="text"
            placeholder="Enter address"
            value={petData.address}
            onChange={handlePetDataChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="button" onClick={handleAddPet}>
          Add Pet
        </Button>
      </Form>
    </Container>
  );
};

export default AddPetPage;
