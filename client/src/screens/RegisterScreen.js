import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { registerUser } from '../redux/actions/userActions';

const RegisterScreen = ({ location, history }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const redirect = location.search ? location.search.split("=")[1] : '/';

    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) history.push(redirect);
    }, [history, userInfo, redirect]);

    const onFormSubmit = e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Password Didn't Match");
        } else {
            dispatch(registerUser(name, email, password));
        }
    };

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={onFormSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Should Match With Password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Sign Up</Button>
            </Form>
            <Row className="py-3">
                <Col>
                    Already Signed Up ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login Now</Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default RegisterScreen;
