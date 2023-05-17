import {Form, Button, Alert} from "react-bootstrap";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const SignUp = () => {
    // const [username, setUsername] = useState('')
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [confirmPassword, setConfirmPassword] = useState('')

    const {register, reset, watch, handleSubmit, formState: {errors}} = useForm()
    const [show, setShow] = useState(false);
    const [serverResponse,setServerResponse] = useState('')
    const submitForm = (data) => {
        console.log(data)

        if (data.password === data.confirmPassword) {

            const body = {
                username: data.username,
                email: data.email,
                password: data.password

            }

            const requestOption = {
                method: 'POST',
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify(body)
            }

            fetch(`${VITE_API_BASE_URL}auth/signup`, requestOption)
                .then(res => res.json())
                .then(data => {
                    setServerResponse(data.message)
                    setShow(true)
                })
                .catch(err => console.log(err))

            reset()
        } else {
            alert('password do not match')
        }


    }

    return (
        <div className='container'>
            <div className="form">

                {show ?
                    <>
                        <Alert variant="success" onClose={() => setShow(false)} dismissible>
                            <p>
                                {serverResponse}
                            </p>
                        </Alert>
                        <h1>sign up page</h1>

                    </>
                    :
                    <h1>sign up page</h1>
                }

                <form>
                    <Form.Group>
                        <Form.Label>username</Form.Label>
                        <Form.Control type='text'
                                      placeholder='username'
                                      {...register('username', {required: true, maxLength: 25})}
                        />
                    </Form.Group>
                    {errors.username && <span style={{color: "red"}}>username is required</span>}
                    {errors.username?.type === "maxLength" && <span style={{color: "red"}}>Max char should be 25</span>}
                    <br/>
                    <Form.Group>
                        <Form.Label>email</Form.Label>
                        <Form.Control type='text'
                                      placeholder='email'
                                      {...register('email', {required: true, maxLength: 80})}
                        />
                    </Form.Group>
                    {errors.email && <span style={{color: "red"}}>email is required</span>}
                    <br/>
                    <Form.Group>
                        <Form.Label>password</Form.Label>
                        <Form.Control type='password'
                                      placeholder='password'
                                      {...register('password', {required: true, minLength: 8})}
                        />
                    </Form.Group>
                    {errors.password && <span style={{color: "red"}}>password is required</span>}
                    {errors.password?.type === "minLength" && <span style={{color: "red"}}>min char should be 8</span>}
                    <br/>
                    <Form.Group>
                        <Form.Label>confirm password</Form.Label>
                        <Form.Control type='password' placeholder='confirm password'
                                      {...register('confirmPassword', {required: true, minLength: 8})}
                        />
                    </Form.Group>
                    {errors.confirmPassword && <span style={{color: "red"}}>confirmPassword is required</span>}
                    {errors.password?.type === "minLength" && <span style={{color: "red"}}>min char should be 8</span>}
                    <br/>
                    <Form.Group>
                        <Button variant='primary' onClick={handleSubmit(submitForm)}>SignUp</Button>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <small>already account ? <Link to='/login'>Login</Link></small>
                    </Form.Group>
                </form>
            </div>

        </div>
    )
}
export default SignUp