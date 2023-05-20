import { React, useState } from "react";
import axios from "axios";
import "./form.css";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import CircularProgress from "@mui/joy/CircularProgress";

const UpdateForm = ({ Title, hide, show, data }) => {
  const [isLoading, setLoading] = useState(false);
  const schema = Yup.object().shape({
    Name: Yup.string().required(),
    Age: Yup.number().min(2).max(99).required(),
    Email: Yup.string().email().required(),
  });
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          Name: data ? data.Name : "",
          Age: data ? data.Age : "",
          Id: data ? data._id : "",
          Email: data ? data.Email : "",
        }}
        onSubmit={async (values) => {
          setLoading(true);
          await axios
            .patch("http://localhost:3001/v1/update" + values.Id, {
              Name: values.Name,
              Age: values.Age,
              Email: values.Email,
            })
            .then(() => {
              setLoading(false);
              toast.success(`User info updated successfully`);
            })
            .catch((error) => {
              toast.error(error.response.data.message);
              setLoading(false);
            });
        }}
        validationSchema={schema}
      >
        {({ values, handleChange, handleSubmit, errors, touched, dirty }) => (
          <>
            <Modal show={show} onHide={hide}>
              <Modal.Header closeButton>
                <Modal.Title>{Title}</Modal.Title>
              </Modal.Header>
              <Form onSubmit={handleSubmit}>
                <Modal.Body className="formstyle">
                  <Form.Group>
                    <Form.Label className="labelstyle">ID</Form.Label>
                    <Form.Control
                      className="inputstyle"
                      type="text"
                      name="Id"
                      value={values.Id}
                      onChange={handleChange}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="labelstyle">Name</Form.Label>
                    <Form.Control
                      className="inputstyle"
                      as="input"
                      name="Name"
                      type="text"
                      value={values.Name}
                      onChange={handleChange}
                    />
                    {errors.Name && touched.Name && (
                      <span style={{ color: "#A30000", fontWeight: "bold" }}>
                        {errors.Name}
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="labelstyle">Age</Form.Label>
                    <Form.Control
                      className="inputstyle"
                      as="input"
                      name="Age"
                      type="text"
                      value={values.Age}
                      onChange={handleChange}
                    />
                    {errors.Age && touched.Age && (
                      <span style={{ color: "#A30000", fontWeight: "bold" }}>
                        {errors.Age}
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="labelstyle">Email</Form.Label>
                    <Form.Control
                      className="inputstyle"
                      as="input"
                      name="Email"
                      type="text"
                      value={values.Email}
                      onChange={handleChange}
                    />
                    {errors.Email && touched.Email && (
                      <span style={{ color: "#A30000", fontWeight: "bold" }}>
                        {errors.Email}
                      </span>
                    )}
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <button className="fill" type="submit" disabled={!dirty}>
                    {isLoading && (
                      <CircularProgress
                        color="danger"
                        determinate={false}
                        size="sm"
                        value={22}
                        variant="soft"
                      />
                    )}
                    Save
                  </button>
                </Modal.Footer>
              </Form>
            </Modal>
          </>
        )}
      </Formik>
    </>
  );
};

export default UpdateForm;
