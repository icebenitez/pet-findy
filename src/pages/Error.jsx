import React, { useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  let error = useRouteError();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="mt-5">
      <Alert variant="danger">
        Oops! Something went wrong. Please go back to{" "}
        <Link to="/login">login page</Link> or <Link to="/">home page</Link>.
      </Alert>
    </Container>
  );
};

export default ErrorPage;
