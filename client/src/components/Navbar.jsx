import React from 'react'
import {Link} from "react-router-dom";
import {useAuth, logout} from "../auth.jsx";


const LoggedInLinks = () => {
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link active" to='/'>Home</Link>
            </li>
            <li className="nav-item">
                <Link to='/create_recipe' className="nav-link active">Create recipe</Link>
            </li>

            <li className="nav-item">
                <a className="nav-link active" href="#" onClick={()=>logout()}>Log Out </a>
            </li>
        </>
    )
}

const LoggedOutLinks = () => {
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link active" to='/'>Home</Link>
            </li>
            <li className="nav-item">
                <Link to='/signup' className="nav-link active">Sign up</Link>
            </li>
            <li className="nav-item">
                <Link to='/login' className="nav-link active">login</Link>
            </li>
        </>
    )
}

const Navbar = () => {

    const [logged] = useAuth()

    console.log(logged)

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Recipe</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {logged ? <LoggedInLinks/> : <LoggedOutLinks/>}

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;