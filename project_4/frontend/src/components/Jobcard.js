import React, { useState } from "react";
import { toast } from "react-toastify";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function Jobcard(prop) {
  const [updateJob, setUpdateJob] = useState({
    company: "",
    job_position: "",
    job_description: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { company, job_position, job_description } = updateJob;

  const onChange = (e) =>
    setUpdateJob({ ...updateJob, [e.target.name]: e.target.value });

  const updateJobList = async (e) => {
    try {
      const body = { company, job_position, job_description };
      await fetch(`http://localhost:5000/joblist/${prop.listofjobs.job_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      toast.warn("Updated job succesfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{prop.listofjobs.job_position}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {prop.listofjobs.company}
          </Card.Subtitle>
          <Card.Text>{prop.listofjobs.job_description}</Card.Text>
          <Button
            variant="warning"
            data-toggle="modal"
            data-target={`#id${prop.listofjobs.job_id}`}
            onClick={handleShow}
          >
            Edit
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit the current job details below</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <tr>
                <input
                  type="text"
                  name="company"
                  value={company}
                  placeholder="Enter company name here"
                  onChange={onChange}
                />
                <input
                  type="text"
                  name="job_position"
                  value={job_position}
                  placeholder="Enter job title/position here"
                  onChange={onChange}
                />
                <input
                  type="text"
                  name="job_description"
                  value={job_description}
                  placeholder="Describe the job requirements and how to contact. "
                  onChange={onChange}
                />
              </tr>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={(e) => updateJobList(e)}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          <Button
            variant="danger"
            onClick={() => prop.deleteAJob(prop.listofjobs.job_id)}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Jobcard;
