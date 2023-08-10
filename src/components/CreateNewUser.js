import { React, useState } from "react";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import CircularProgress from "@mui/joy/CircularProgress";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import "./form.css";

const Newuser = () => {
  const [isLoading, setLoading] = useState(false);
  const schema = Yup.object().shape({
    Name: Yup.string().min(3).required(),
    Age: Yup.number().min(2).max(99).required(),
    Email: Yup.string().email().required(),
  });
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ Name: "", Age: "", Email: "" }}
        onSubmit={async (values) => {
          setLoading(true);
          await axios
            .post("http://localhost:3001/v1/create", {
              Name: values.Name,
              Age: values.Age,
              Email: values.Email,
            })
            .then((res) => {
              setLoading(false);
              const { Name } = res.data;
              toast.success(`New user ${Name} created successfully`);
            })
            .catch((err) => {
              console.log(err.message);
              setLoading(false);
              toast.error(err.message);
            });
        }}
        validationSchema={schema}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="formstyle">
            <Form.Group>
              <Form.Label className="labelstyle">Name</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                as="input"
                name="Name"
                value={values.Name}
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
                type="text"
                onChange={handleChange}
                as="input"
                name="Age"
                value={values.Age}
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
                type="text"
                onChange={handleChange}
                as="input"
                name="Email"
                value={values.Email}
              />
              {errors.Email && touched.Email && (
                <span style={{ color: "#A30000", fontWeight: "bold" }}>
                  {errors.Email}
                </span>
              )}
            </Form.Group>
            <button type="submit" className="fill">
              {isLoading && (
                <CircularProgress
                  color="danger"
                  determinate={false}
                  size="sm"
                  value={22}
                  variant="soft"
                />
              )}
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Newuser;
