import React from 'react';
import { Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCurrency } from '../utils/addCurrency';
import { addToCart } from '../slices/cartSlice';
import Rating from './Rating';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: 1 }));
    navigate('/cart');
  };

  return (
    <Card className='my-3 product-card'>
      <div className="product-image-container">
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant='top' className='product-image' />
        </Link>
        <div className="quick-view-text">Quick View</div>
      </div>

      <Card.Body>
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <Card.Title as='div' className='product-title'>
            {product.name}
          </Card.Title>
        </Link>

        {/* Optional: You can keep or remove the rating */}
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`(${product.numReviews})`}
          />
        </Card.Text>

        <div className="product-price">
          {addCurrency(product.price)}
        </div>
        
        <button
          className='product-button'
          type='button'
          disabled={product.countInStock === 0}
          onClick={addToCartHandler}
        >
          Add To Cart
        </button>
      </Card.Body>
    </Card>
  );
};

export default Product;
