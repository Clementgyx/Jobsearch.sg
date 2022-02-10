import React from "react";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Landing() {
  return (
    <Container fluid>
      <Row>
        <div>
          <h1>
            Jobsearch
            <Badge pill bg="info">
              SG
            </Badge>
          </h1>
        </div>
        <div>
          <h2>We'll find the perfect job for you!</h2>
        </div>
        <div>
          <img
            src="https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2020/01/11140027/send-email-1024x512.png"
            alt="landing"
          ></img>
          <div className="d-grid gap-2">
            <Link to="/login">
              <Button variant="primary" size="lg">
                Click here to login/register
              </Button>
            </Link>
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default Landing;
