import {Form, Button} from "react-bootstrap";
import {useForm} from "react-hook-form";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const CreateRecipe = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm()

    const createRecipe = (data) => {

        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')

        console.log(token)

        const requestOption = {
            method: 'POST',
            headers: {
                'content-type': "application/json",
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify(data)
        }

        fetch(`${VITE_API_BASE_URL}recipe/recipes`, requestOption)
            .then(res => res.json())
            .then(data => reset())
            .catch(err => console.log(err))


    }

    return (
        <div className='container'>
            <h1>Create recipe </h1>
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
                    <Button variant='primary' onClick={handleSubmit(createRecipe)}>save</Button>
                </Form.Group>
            </form>
        </div>
    )
}
export default CreateRecipe

