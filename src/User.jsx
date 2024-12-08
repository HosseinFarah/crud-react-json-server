import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const User = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:3000/users/${id}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const updateMember = (e) => {
        e.preventDefault();
        if (!user.name || !user.email) {
            alert('Please enter name and email');
            return;
        }
        axios
            .put(`http://localhost:3000/users/${id}`, user)
            .then((res) => {
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div className="container">
                <div className="row d-flex justify-content-center ms-5">
                    <h1>User</h1>
                    <form className="col-6" onSubmit={updateMember}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" value={user.name} 
                            onChange={(e) => setUser({ ...user, name: e.target.value })} 
                            required
                            />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" value={user.email} 
                            onChange={(e) => setUser({ ...user, email: e.target.value })} required />

                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button className="btn btn-danger ms-2" onClick={() => navigate('/')}><i className="fa fa-times"></i></button>
                    </form>
                </div>
            </div>
        </>
    );
}
export default User;