import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [user, setUser] = useState([]);
  const [updateUser, setUpdateUser] = useState({ id: null, name: '', email: '' });

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      axios
        .delete(`http://localhost:3000/users/${id}`)
        .then(() => {
          setUser(user.filter((data) => data.id !== id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const addUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;

    if (user.some((data) => data.email === email)) {
      alert("User already exists");
      return;
    }

    axios.post("http://localhost:3000/users", { name, email })
      .then((res) => {
        setUser([...user, res.data]);
        event.target.reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const editUser = (event) => {
    event.preventDefault();
    const { id, name, email } = updateUser;

    if (user.some((data) => data.email === email && data.id !== id)) {
      alert("User with this email already exists");
      return;
    }
    axios.put(`http://localhost:3000/users/${id}`, { name, email })
      .then((res) => {
        setUser(user.map((data) => (data.id === id ? res.data : data)));
        document.querySelector("#exampleModal .btn-close").click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditClick = (data) => {
    setUpdateUser(data);
  };

  return (
    <>
      <div className="container">
        <h1>Users</h1>
        <div className="row d-flex justify-content-center mt-4 mb-5">
          <div className="col-md-6">
            <form className="form form-group" onSubmit={addUser}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  name="name"
                  required
                />
              </div>
              <div className="form-group mt-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  name="email"
                  required
                />
                <button className="btn btn-primary form-group mt-3">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          {user.map((data) => (
            <div key={data.id} className="data">
              <h3>{data.name}</h3>
              <p>
                {data.email}
                <button
                  className="btn btn-primary"
                  onClick={() => deleteUser(data.id, data.name)}
                >
                  <i className="fa fa-trash"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-success ms-2 me-1"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleEditClick(data)}
                >
                  <i className="fa fa-edit "></i>
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit User
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="form form-group" onSubmit={editUser}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    value={updateUser.name}
                    required
                    onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
                  />
                </div>
                <div className="form-group mt-2">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    value={updateUser.email}
                    required
                    onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
