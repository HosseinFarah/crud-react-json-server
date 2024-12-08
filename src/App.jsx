import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
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

  const deleteUser = (id,name) => {
    return () => {
      if (window.confirm(`Are you sure you want to delete ${name}`)){
      axios
        .delete(`http://localhost:3000/users/${id}`)
        .then(() => {
          setUser(user.filter((u) => u.id !== id));
          alert("User deleted successfully");
        })
        .catch((err) => {
          console.log(err);
        });
      }
    };
  }


  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center ms-5">
          <Link to="/countries" className="btn btn-primary">Countries</Link>
          <h1>Users</h1>
          <table className="table table-striped bg-white">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {user.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                      <button className="btn btn-primary me-2" onClick={() => navigate(`/users/${u.id}`)}>
                        <i className="fa fa-edit"></i>
                      </button>

                    <button className="btn btn-danger"
                    onClick={deleteUser(u.id,u.name)}
                    ><i className="fa fa-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
    </>
  );
};
export default App;
