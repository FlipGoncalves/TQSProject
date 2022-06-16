import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Footer from "./Footer";
import Navbar from './Navbar';
import axios from 'axios';


{/*async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}*/}


const Login = () => {
    const navigate = useNavigate();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [error_message, setError] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();

        this.setState({error_message: null})

        const infouser = { username, password }
        console.log(infouser);
        
        axios.get('http://localhost:8080/lego/login/'+username)
        .then((response) => {
            console.log(response);
            if (response.status === 200 || response.status === 201) {

            if (response.data["password"] != password) {
                setError("Wrong credential")
                return
            }

            setError("")
            localStorage.setItem('username', username)
            localStorage.setItem('password', password)
            console.log("HERE")
            localStorage.setItem('user', infouser);
            navigate("/")
            }
        })
        .catch((error) => {
            console.log(error);
            setError("ERROR during sign in")
        });

        localStorage.setItem('user', infouser);
        navigate("/")
    }

    return (
    <div>
    <div class="container">

        <Navbar />

        <section class="section-main padding-y">
            <main class="card">
                    <div class="card-body">
                        <form accept-charset="utf-8" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <b><label htmlFor="name" >User Name or Email</label></b>
                                <input className="form-control input-filled-valid" id="name" name="name" required
                                       type="text" value={username} onChange={(e) => setUserName(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <b><label htmlFor="password">Password</label></b>
                                <input className="form-control input-filled-valid" id="password" name="password"
                                       required type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="row pt-3">
                                <div className="col-md-6">
                                    <input className="btn btn-md btn-primary btn-outlined float-right" id="_submit"
                                           name="_submit" type="submit" value="Submit" />
                                </div>
                            </div>
                        </form>
                        {error_message !== "" ? <p id="error">{error_message}</p> : <></>}
                        <p class="mb-2 text-sm mx-auto">
                            Don't have an account ?
                            <Link to="/register">
                                <a class="text-primary text-gradient font-weight-bold">Sign up</a>
                            </Link>
                        </p>
                    </div>
                </main>
            </section>
        </div>
        
    </div>
  );
}

{/*Login.propTypes = {
    setToken: PropTypes.func.isRequired
} */}

export default Login;