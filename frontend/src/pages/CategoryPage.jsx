import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { useGetProductsQuery } from '../slices/productsApiSlice'; 

const CategoryPage = () => {
  const { categoryName } = useParams();

 
  const { data, isLoading, error } = useGetProductsQuery({
    category: categoryName,
  });

  
  const capitalizedCategory =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <>
      <Meta title={`Shop for ${capitalizedCategory}`} />
      <Link to='/' className='btn btn-light mb-4'>
        Go Back
      </Link>
      <h1>{capitalizedCategory} Products</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {data.products.length === 0 && <Message>No products found in this category.</Message>}
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default CategoryPage;
