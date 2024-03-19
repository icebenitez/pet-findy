import { useState, useEffect } from "react";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { Stack } from "react-bootstrap";

const Home = () => {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const querySnapshot = await getDoc(
          doc(db, "Users", "VmrQVGcTXa7OwzN4Nbhv")
        );

        if (querySnapshot.exists()) {
          setUser(querySnapshot.data());
        }

        setIsLoading(false);
      } catch (error) {
        console.log("this is the error :>>", error);
        setIsError(true);
      }
    };

    getUser();
  }, []);

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <Stack gap={1}>
        <div className="p-4">
          <div>username: {user?.username}</div>
          <div>email address: {user?.emailAddress}</div>
          <div>contact number: {user?.contactNumber}</div>
          <div>address: {user?.fullAddress || "sa bahay"}</div>
        </div>
        <div className="p-7">
          <h2>Pets</h2>
        </div>
      </Stack>
    </div>
  );
};

export default Home;
