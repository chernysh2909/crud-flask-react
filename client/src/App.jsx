import {useState, useEffect} from 'react'
import Navbar from "./components/Navbar.jsx";
import {Routes, Route} from "react-router-dom";
import HomePage from "./components/Home.jsx";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import CreateRecipe from "./components/CreateRecipe.jsx";
import './styles/main.css'


function App() {
    //  const [message, setMessage] = useState('')
    //
    // useEffect(() => {
    //     fetch('http://127.0.0.1:5000/recipe/hello')
    //         .then(res => res.json())
    //         .then(data => setMessage(data.message))
    //         .catch(err => console.log(err))
    // }, [])



    return (

        <>
            <Navbar/>
            {/*<h1>{message}</h1>*/}
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/create_recipe' element={<CreateRecipe/>}/>
            </Routes>
        </>
    )
}

export default App
