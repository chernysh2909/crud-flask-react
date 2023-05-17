import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import { login } from '../auth'
import {useNavigate} from  "react-router-dom"
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const Login = () => {
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    const {register,reset, handleSubmit, watch, formState: {errors}} = useForm()
    const navigate = useNavigate()
    const loginUser = (data) => {
        const body = {
                username: data.username,
                password: data.password

            }

            const requestOption = {
                method: 'POST',
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify(body)
            }

            fetch(`${VITE_API_BASE_URL}auth/login`, requestOption)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    login(data.access_token)
                    navigate('/')
                })
                .catch(err => console.log(err))


        reset()
    }

    return (
        <div className='container'>
            <div className="form">
                <h1>sign up page</h1>
                <form>
                    <Form.Group>
                        <Form.Label>username</Form.Label>
                        <Form.Control type='text'
                                      placeholder='username'
                                      {...register('username', {required: true, maxLength: 25})}
                        />
                    </Form.Group>
                    {errors.username && <span style={{color:"red"}}><small>username required</small></span>}
                    <br/>

                    <Form.Group>
                        <Form.Label>password</Form.Label>
                        <Form.Control type='password'
                                      placeholder='password'
                                      {...register('password', {required: true, minLength: 8})}

                        />
                    </Form.Group>
                    {errors.password && <span style={{color:"red"}}><small>password required</small></span>}
                    <br/>
                    <Form.Group>
                        <Button variant='primary' onClick={handleSubmit(loginUser)}>Login</Button>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <small>Do not have account? <Link to='/signup'>create</Link></small>
                    </Form.Group>
                </form>
            </div>

        </div>
    )
}
export default Login