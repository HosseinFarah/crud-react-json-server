import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        console.log(res.data);
        setCountries(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const searchContry = (e) => {
    const query = e.target.value.toLowerCase();
    console.log(query);

    setSearch(query);
    if (query === "") {
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then((res) => {
          setCountries(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(query)
      );
      setCountries(filteredCountries);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="container d-flex justify-content-center">
        <div className="row d-flex justify-content-center ms-5">
          <h1>Countries</h1>
          <form className="col-6">
            <div className="mb-3">
              <label htmlFor="search" className="form-label">
                Search
              </label>
              <input
                type="text"
                className="form-control"
                id="search"
                value={search}
                onChange={searchContry}
              />
            </div>
          </form>
          <br />
          <table className="table table-striped bg-white">
            <thead>
              <tr>
                <th>Name</th>
                <th>Capital</th>
                <th>Population</th>
                <th>Area</th>
                <th>Flag</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(countries) &&
                countries.map((c, index) => (
                  <tr key={index}>
                    <td>{c.name.common}</td>
                    <td>{c.capital}</td>
                    <td>{c.population}</td>
                    <td>{c.area}</td>
                    <td>
                      <img
                        src={c.flags.png}
                        alt={c.name.common}
                        width="100"
                        height="50"
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/countries/${c.name.common}`)}
                      >
                        <i className="fa fa-info"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Countries;
