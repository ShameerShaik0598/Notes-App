import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (user, { setSubmitting }) => {
    try {
      // Save user in JSON server
      await axios.post("http://localhost:1500/user/user-registration", user);
      console.log(user);
      setSubmitting(false);
      navigate("/login");
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="register col-12 col-sm-8 col-md-6 mt-5 pt-2 pb-4 m-auto mb-3 shadow rounded">
      <p className="para display-5 text-success fw-bold text-center">
        Register
      </p>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                {/* First Name */}
                <div className="m-3 mt-3">
                  <div className="inputbox d-flex justify-content-between m-1">
                    <label className="form-label fw-bold">First Name</label>
                  </div>
                  <Field
                    className="form-control"
                    type="text"
                    placeholder="Enter Your First Name"
                    name="first_name"
                  />
                  <ErrorMessage
                    name="first_name"
                    component="p"
                    className="text-danger"
                  />
                </div>
                {/* Last Name */}
                <div className="m-3 pb-3">
                  <label className="form-label fw-bold">Last Name</label>
                  <Field
                    className="form-control"
                    type="text"
                    placeholder="Enter Your Last Name"
                    name="last_name"
                  />
                  <ErrorMessage
                    name="last_name"
                    component="p"
                    className="text-danger"
                  />
                </div>
                {/* Email */}
                <div className="m-3 pb-3">
                  <label className="form-label fw-bold">Email</label>
                  <Field
                    className="form-control"
                    type="email"
                    placeholder="Enter Your Email"
                    name="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-danger"
                  />
                </div>
                {/* Password */}
                <div className="m-3 pb-3">
                  <label className="form-label fw-bold">Password</label>
                  <Field
                    className="form-control"
                    type="password"
                    placeholder="Enter Your Password"
                    name="password"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-danger"
                  />
                </div>
                <button
                  className="registerBtn btn btn-success d-block mx-auto m-3"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span style={{ color: "white" }}>Submit</span>
                </button>
                <div className="createaccount text-center text-dark ">
                  <p>Have an account.</p>
                  <NavLink
                    className="text-primary text-decoration-none"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
