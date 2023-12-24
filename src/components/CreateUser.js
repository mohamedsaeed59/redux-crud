import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../redux/features/UserSlice";

const CreateUser = () => {
  const [values, setValues] = useState({ name: "", email: "" });
  const [showUser, setShowUser] = useState(false);
  const { name, email } = values;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handle user function
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser({ name, email }));
    setValues({ name: "", email: "" });
    setShowUser(true);
    navigate("/")
  };

  return (
    <div>
      <h1 className="text-center bg-dark text-white p-2">Create User </h1>
      <form action="">
        <div className="mb-3 mt-4">
        <label htmlFor="floatingTextarea">Add the Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3 mt-4">
        <label htmlFor="floatingTextarea">Add the Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            id="floatingTextarea"
          />
        </div>
        <div className="mt-4 d-flex align-items-end justify-content-start">
          <button
            className="btn btn-danger"
            type="submit"
            onClick={handleSubmit}
          >
            submit
          </button>
        </div>
      </form>
      <div className="mt-4">{showUser}</div>
    </div>
  );
};

export default CreateUser;
