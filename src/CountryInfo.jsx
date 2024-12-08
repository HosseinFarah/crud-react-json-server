import { useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate,useParams } from "react-router-dom";

const CountryInfo = () => {
    const { name } = useParams();
    console.log("name",name);
    
    const navigate = useNavigate();
    const [country, setCountry] = useState({});
    const [error, setError] = useState(false);
    useEffect(() => {
        axios
            .get(`https://restcountries.com/v3.1/name/${name}`)
            .then((res) => {
                if (res.data.length > 0) {
                    setCountry(res.data[0]);
                    setError(false);
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log(err);
                setError(true);
            });
    }
    , [name]);

    return (
        <>
            <div className="container">
                <div className="row d-flex justify-content-center ms-5">
                    <h1>Country Info</h1>
                    {error ? (
                        <div className="alert alert-danger" role="alert">
                            Country not found.
                        </div>
                    ) : (
                        <>
                            <table className="table table-striped bg-white">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Capital</th>
                                        <th>Population</th>
                                        <th>Area</th>
                                        <th>Languages</th>
                                        <th>Flag</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{country.name?.common}</td>
                                        <td>{country.capital?.[0]}</td>
                                        <td>{country.population}</td>
                                        <td>{country.area}</td>
                                        <td>
                                            <ul>
                                                {country.languages && Object.values(country.languages).map((lang, index) => (
                                                    <li key={index}>{lang}</li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td>
                                            <img src={country.flags?.png} alt={country.name?.common} width="50" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </>
                    )}
                    <button className="btn btn-danger" onClick={() => navigate('/countries')}>
                        Back
                    </button>
                </div>
            </div>
        </>
    );
}

export default CountryInfo;