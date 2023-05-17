import {Button, Card, Modal} from "react-bootstrap"
const Recipe = ({title, description,onClick, onDelete}) => {
    return (
        <Card className="recipe">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Button variant="primary" onClick={onClick}>update</Button>
                {' '}
                <Button variant="danger" onClick={onDelete}>delete</Button>
            </Card.Body>

        </Card>
    )
}

export default Recipe;