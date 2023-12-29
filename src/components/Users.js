import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEdit, updateUser } from "../redux/features/UserSlice";
import { useNavigate } from "react-router-dom";
import { deleteUser, getUser } from "../redux/features/UserSlice";
import Spinner from "./Spinner";

const Posts = () => {
  const [id, setId] = useState("");
  const [textName, setTextName] = useState(""); 
  const [textBody, setTextBody] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, users, body, text, edit } = useSelector((state) => ({...state.app}));

 useEffect(() => {
    if (body) {
      setTextBody(body);
    }
  }, [body]);

useEffect(() => {
    if (text) {
      setTextName(text);
    }
  }, [text]);

  //function
  const handleFetchData = (e) => {
    e.preventDefault();
    if (!id) {
      window.alert("Please Enter the ID");
    } else {
      dispatch(getUser({ id }));
    }
  };
  //delete handler
  const handleDelete = () => {
    dispatch(deleteUser({ id: users[0].id }));
    window.location.reload();
    window.alert("Do you want to delete the user?");
  };

return (
<>
  <div className="row mt-4 d-flex align-items-center justify-content-center">
    <div className="col-md-8">
      <form action="">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            View the User by His ID:
          </label>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <button
          onClick={handleFetchData}
          type="submit"
          className="btn btn-primary"
        >
          View Post
        </button>
        <button
          onClick={() => navigate("/createuser")}
          type="button"
          className="btn btn-warning ms-4"
        >
          Add a New post
        </button>
      </form>
    </div>
  </div>
  <div className="container">
    {loading ? (
      <Spinner />
    ) : (
  <>
    {users.length > 0 && (
      <>
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">{users[0].name}</h5>
            <p className="card-text">{users[0].email}</p>
            {edit ? (
            <>
              <textarea
                className="form-control"
                value={textName}
                onChange={(e) => setTextName(e.target.value)}
                id="floatingTextarea"
              />
              <textarea
                className="form-control"
                value={textBody}
                onChange={(e) => setTextBody(e.target.value)}
                id="floatingTextarea"
              />
              <div className="d-flex align-items-end justify-content-end">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    dispatch(
                      updateUser({
                        id: users[0].id,
                        name: textName,
                        email: textBody,
                      })
                    );
                    dispatch(setEdit({ edit: false, body: "", text: "" }));
                  }}
                >
                  Save
                </button>
                <button
                  className="btn btn-danger ms-4"
                  onClick={() =>
                    dispatch(setEdit({ edit: false, body: "", text: ""  }))
                  }
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
            </>
          )}
          {!edit && (
            <div className="d-flex align-items-center justify-content-end">
              <button
                className="btn btn-primary"
                onClick={() =>
                  dispatch(
                    setEdit({ edit: true, text: users[0].name, body: users[0].email })
                  )
                }
              >
                Edit
              </button>
              <button
                className="btn btn-danger ms-4"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </>
    )}
  </>
    )}
  </div>
</>
);
};

export default Posts;
