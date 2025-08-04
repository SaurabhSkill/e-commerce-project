import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Hero from '../components/Hero';
import Meta from '../components/Meta';

const HomePage = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    page: pageNumber,
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          {!keyword ? (
            <Hero /> 
          ) : (
            <Link to='/' className='btn btn-light mb-4'>
              Go Back
            </Link>
          )}
          
          <div id="featured-products">
            <h1>{keyword ? `Search Results for "${keyword}"` : 'Featured Products'}</h1>
            
            {data.products.length === 0 && <Message>No Products Found</Message>}

            <Row>
              {data.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>

            <div className="mt-4">
              <Paginate
                pages={data.pages}
                page={data.page}
                keyword={keyword ? keyword : ''}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
