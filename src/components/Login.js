import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../Login.css";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import pic from "./undraw_taking_notes_re_bnaf.svg";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../userLoginSlice";

function Login() {
  //create dispatcher
  let dispatch = useDispatch();

  const { handleSubmit, register, reset } = useForm();

  let { userObj, errorMessage, status } = useSelector((state) => state.user);

  //handlelogin
  const handleLogin = (credentials) => {
    console.log(credentials);
    let actionObj = userLogin(credentials);
    dispatch(actionObj);
    reset();
  };

  let navigate = useNavigate();

  useEffect(() => {
    if (status === "success") {
      navigate("/get-all-notes");
    }
  }, [userObj]);

  return (
    <div className="row">
      <div className="col">
        <div className="col">
          <h1 className="display-1 text-center ">Notes App</h1>
          <img className="pic" src={pic} />
        </div>
      </div>
      <div className="col">
        <div className="form-box col-12 col-sm-8 col-md-6 mt-5 pt-2 pb-4 m-auto mb-3 ">
          <form action="" onSubmit={handleSubmit(handleLogin)}>
            <h2 className="text-center text-success fs-1 m-3">Log In</h2>
            {/* Email  */}
            <div className="m-3 mt-4">
              <div className="inputbox d-flex justify-content-between m-2">
                <label className="fw-bold">Email</label>
                <ion-icon name="mail-outline"></ion-icon>
              </div>
              <input
                className="form-control"
                type="email"
                placeholder="Enter Your Email"
                {...register("email", { require: "Email is required" })}
              ></input>
            </div>
            {/* password  */}
            <div className="m-3">
              <div className="inputbox  d-flex justify-content-between mt-3 mb-2 ms-1 ">
                <label className="fw-bold">Password</label>
                <ion-icon name="lock-closed-outline"></ion-icon>
              </div>
              <input
                className="form-control"
                type="password"
                placeholder="Enter Your Password"
                {...register("password", { require: "Password is required" })}
              ></input>
            </div>

            <NavLink
              className="text-decoration-none me-4 text-primary d-flex justify-content-end"
              to="/forgot-password"
            >
              Forgot Password
            </NavLink>
            <div className="m-3">
              <button type="submit" className="btn btn-success d-block mx-auto">
                <span style={{ color: "white" }}>Log In</span>
              </button>
            </div>
          </form>

          <div className="createaccount text-center text-dark ">
            <p>Don't have an account. </p>
            <NavLink
              className="text-primary text-decoration-none"
              to="/register"
            >
              Register
            </NavLink>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
