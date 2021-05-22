import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../redux/actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = ({ history }) => {

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress.address) {
        history.push('/shipping');
    };

    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    const dispatch = useDispatch();

    const onFormSubmit = e => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={onFormSubmit}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <Button type="submit" variant="primary">Continue</Button>
            </Form>
        </FormContainer>
    );
}

export default PaymentScreen;
