import React, { useState } from "react";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import CircularProgress from "@mui/joy/CircularProgress";
import { updateUser } from "../client/client";

const UpdateForm = ({ Title, hide, show, data, setRefresh, setShow }) => {
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
          updateUser(values)
            .then(() => {
              setLoading(false);
              toast.success(`User info updated successfully`);
              setShow(false);
              setRefresh(true);
            })
            .catch((error) => {
              toast.error(error.message);
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
                <Modal.Body>
                  <Form.Group>
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="Id"
                      value={values.Id}
                      onChange={handleChange}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
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
                    <Form.Label>Age</Form.Label>
                    <Form.Control
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
                    <Form.Label>Email</Form.Label>
                    <Form.Control
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
                  <button type="submit" disabled={!dirty}>
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
