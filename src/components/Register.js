import React, { useState } from "react";
// import "./Register.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  let {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  let [err, setErr] = useState("");

  let navigate = useNavigate();

  const onSubmit = async (user) => {
    try {
      //save in json server
      let res = await axios.post(
        "http://localhost:1500/user/user-registration",
        user
      );
      console.log(user);

      if (res.status === 201) {
        setErr("");
        //navigate to login
        navigate("/login");
      }
    } catch (err) {
      console.log("err caught is", err);
      setErr(err.message);
    }
    reset();
  };

  return (
    <div className="register col-12 col-sm-8 col-md-6 mt-5 pt-2 pb-4 m-auto mb-3 shadow rounded">
      <p className="para display-5 text-success fw-bold text-center">
        Register
      </p>
      {err && <p className="text-center text-danger fs-1">{err}</p>}
      <div >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {/* First Name  */}
            <div className="m-3 mt-3">
            <div className="inputbox d-flex justify-content-between m-1">
              <lable className="form-label fw-bold">First Name</lable>
              </div>
              <input
                className="form-control"
                {...register("first_name", {
                  required: "First Name is required",
                })}
                type="text"
                placeholder="Enter Your First Name"
              />
              {errors.first_name && (
                <p className=" text-danger">{errors.first_name?.message}</p>
              )}
            </div>
            <div>
              {/* Last Name  */}
              <div className="m-3 pb-3">
                <lable className="form-label fw-bold">Last Name</lable>
                <input
                  className="form-control"
                  {...register("last_name", {
                    required: "Last Name is required",
                  })}
                  type="text"
                  placeholder="Enter Your Last Name"
                />
                {errors.last_name && (
                  <p className=" text-danger">{errors.last_name?.message}</p>
                )}
              </div>
              {/* Email  */}
              <div className="m-3 pb-3">
                <label className="form-label fw-bold">Email</label>
                <input
                  className="form-control "
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  placeholder="Enter Your Email"
                />{" "}
                {errors.email && (
                  <p className=" text-danger">{errors.email?.message}</p>
                )}
              </div>
              {/* Password  */}
              <div className="m-3 pb-3">
                <label className="form-label fw-bold">Password</label>
                <input
                  className="form-control "
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  placeholder="Enter Your Password"
                />{" "}
                {errors.password && (
                  <p className="text-danger">{errors.password?.message}</p>
                )}
              </div>

              <button className="registerBtn btn btn-success d-block mx-auto m-3">
                <span style={{ color: "white" }}>Submit</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
