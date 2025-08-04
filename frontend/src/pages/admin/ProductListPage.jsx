import React, { useState, useMemo } from 'react';
import { Table, Button, Row, Col, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTrash, FaEdit } from 'react-icons/fa';
import {
  useGetAdminProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from '../../slices/productsApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Meta from '../../components/Meta';
import { addCurrency } from '../../utils/addCurrency';

const ProductListPage = () => {
  const { data: products, isLoading, error, refetch } = useGetAdminProductsQuery();
  const [deleteProduct, { isLoading: isDeleteProductLoading }] = useDeleteProductMutation();
  const [createProduct, { isLoading: isCreateProductLoading }] = useCreateProductMutation();
  
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const deleteHandler = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        toast.success('Product deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        const newProduct = await createProduct().unwrap();
        navigate(`/admin/product/${newProduct._id}/edit`);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const categories = useMemo(() => {
    if (!products) return [];
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return uniqueCategories.sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let tempProducts = [...products];
    if (selectedCategory) {
      tempProducts = tempProducts.filter(
        (product) => product.category === selectedCategory
      );
    }
    if (searchTerm) {
      tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return tempProducts;
  }, [products, searchTerm, selectedCategory]);

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <Meta title={'Product List'} />
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' variant='warning' onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>

      <Row className="my-3 bg-light p-3 rounded">
        <Col md={6}>
          <Form.Group controlId="searchProductName">
            <Form.Label>Search by Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="filterCategory">
            <Form.Label>Filter by Category</Form.Label>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {isCreateProductLoading && <Loader />}
      {isDeleteProductLoading && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <p>{filteredProducts.length} product(s) found.</p>
          <Table striped hover bordered responsive size='sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{addCurrency(product.price)}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button className='btn-sm' variant='light'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      className='btn-sm'
                      variant='light'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: 'red' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductListPage;
