import React, { useEffect } from 'react';
import { Fragment } from 'react';

// External Imports
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// Internal Imports
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts } from '../redux/actions/productAction';

const HomeScreen = () => {

    const dispatch = useDispatch();

    const { loading, error, products } = useSelector(state => state.productList);

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Fragment>
                    <h1>Latest Products</h1>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                </Fragment>
            )}
        </Fragment>
    );
}

export default HomeScreen;
