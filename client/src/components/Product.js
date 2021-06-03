import React from 'react';

// External Imports
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Internal Imports 
import Rating from './Rating'

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img
                    src={product.image}
                    variant='top'
                    onError={e => {
                        e.target.onerror = null; e.target.src = "https://via.placeholder.com/450?text=Can't+Read+The+Image+Please+Edit+The+Image+With+URL"
                    }}
                />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    />
                </Card.Text>

                <Card.Text as='h3'>${product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Product;
