import {Link} from "react-router-dom";
import {useAuth} from "../auth.jsx";
import {useEffect, useState} from "react";
import Recipe from "./Recipe.jsx";
import {Button, Form, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import data from "bootstrap/js/src/dom/data.js";
import recipe from "./Recipe.jsx";
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL


const LoggedInHome = () => {

    const [recipes, setRecipes] = useState([])
    const [show, setShow] = useState(false)
    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm()
    const [recipeId, setRecipeId] = useState(0)

    useEffect(() => {
        fetch(`${VITE_API_BASE_URL}recipe/recipes`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setRecipes(data)
            })
            .catch(err => console.log(err))
    }, [])

    const getAllRecipes=()=>{
        fetch(`${VITE_API_BASE_URL}recipe/recipes`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setRecipes(data)
            })
            .catch(err => console.log(err))
    }

    const closeModal = () => {
        setShow(false)
    }

    const showModal = (id) => {
        setShow(true)
        setRecipeId(id)
        recipes.map(
            (recipe) => {
                if (recipe.id === id) {
                    setValue('title', recipe.title)
                    setValue('description', recipe.description)
                }
            }
        )
    }
    let token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')

    const updateRecipe = (data) => {

        const requestOption = {
            method: 'PUT',
            headers: {
                'content-type': "application/json",
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify(data)
        }

        fetch(`${VITE_API_BASE_URL}recipe/recipe/${recipeId}`, requestOption)
            .then(res => res.json())
            .then(data => {
                    const reload = window.location.reload()
                    reload()
                }
            )
            .catch(err => console.log(err))


    }

    const deleteRecipe = (id) => {

        const requestOption = {
            method: 'DELETE',
            headers: {
                'content-type': "application/json",
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify(data)
        }

        fetch(`${VITE_API_BASE_URL}recipe/recipe/${id}`, requestOption)
            .then(res => res.json())
            .then(data => {
                   console.log(data)
                    getAllRecipes()
                }
            )
            .catch(err => console.log(err))


    }

    return (
        <div className='recipes container'>
            <Modal
                show={show}
                size="lg"
                onHide={closeModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        update recipe
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type='text'
                                          {...register('title', {required: true, maxLength: 25})}
                            />
                        </Form.Group>
                        {errors.title && <span style={{color: "red"}}><small>title required</small></span>}
                        <br/>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as='textarea' rows={5} type='text'
                                          {...register('description', {required: true, maxLength: 225})}
                            />
                        </Form.Group>
                        {errors.description && <span style={{color: "red"}}><small>description required</small></span>}
                        <br/><br/>
                        <Form.Group>
                            <Button variant='primary' onClick={handleSubmit(updateRecipe)}>save</Button>
                        </Form.Group>
                    </form>
                </Modal.Body>
            </Modal>
            <h1>list of recipes</h1>
            {
                recipes.map((recipe, index) => {
                        return <Recipe
                            key={index}
                            title={recipe.title}
                            description={recipe.description}
                            onClick={() => showModal(recipe.id)}
                            onDelete={() => deleteRecipe(recipe.id)}
                        />
                    }
                )
            }
        </div>
    )
}

const LoggedOutHome = () => {
    return (

        <div className='home container'>
            <h1 className='heading'>welcome to the recipe</h1>
            <Link to="/signup" className='btn btn-primary btn-lg'>Get started</Link>
        </div>

    )
}

const HomePage = () => {
    const [logged] = useAuth()
    return (
        <>
            {logged ? <LoggedInHome/> : <LoggedOutHome/>}
        </>

    )
}
export default HomePage