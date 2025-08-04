import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  if (pages <= 1) {
    return null;
  }

  const getUrl = (p) => {
    if (isAdmin) {
      return `/admin/product-list/page/${p}`;
    }
    if (keyword) {
      return `/search/${keyword}/page/${p}`;
    }
    return `/page/${p}`;
  };

  return (
    <div className='d-flex justify-content-center'>
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer key={x + 1} to={getUrl(x + 1)}>
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    </div>
  );
};

export default Paginate;
