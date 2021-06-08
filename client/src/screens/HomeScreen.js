import React, { useEffect } from 'react';
import { Fragment } from 'react';

// External Imports
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Internal Imports
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import ProductCarousel from '../components/ProductCarousel';
import Paginate from '../components/Paginate';
import { listProducts } from '../redux/actions/productAction';

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const { loading, error, products, page, pages } = useSelector(state => state.productList);

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    return (
        <Fragment>
            <Meta />
            {!keyword ? <ProductCarousel /> : <Link to="/" className="btn btn-light">go Back</Link>}
            <h1>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Fragment>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
                </Fragment>
            )}
        </Fragment>
    );
}

export default HomeScreen;
