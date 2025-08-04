import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Badge, NavDropdown, Image } from 'react-bootstrap'; // 1. Import Image component
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { toast } from 'react-toastify';
import SearchBox from './SearchBox';

const Header = () => {
  const { cartItems } = useSelector(state => state.cart);
  const { userInfo } = useSelector(state => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
      toast.success('Logout successful');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <Navbar
      bg='light'
      variant='light'
      expand='md'
      collapseOnSelect
      className='fixed-top z-2 shadow-sm'
      style={{ backgroundColor: 'var(--surface-color)' }}
    >
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>
            <Image 
              src='/images/logo.png' 
              alt='MERN Shop Logo' 
              style={{ height: '40px' }} 
            />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <div className='mx-auto flex-grow-1' style={{ maxWidth: '500px' }}>
            <SearchBox />
          </div>

          <Nav className='ms-auto'>
            <LinkContainer to='/cart'>
              <Nav.Link>
                <FaShoppingCart style={{ marginRight: '5px' }} />
                {cartItems.length > 0 && (
                  <Badge
                    pill
                    bg='danger'
                    style={{ marginLeft: '5px' }}
                  >
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={<FaUser />} id='username' align="end">
                <NavDropdown.Header>Hello, {userInfo.name}</NavDropdown.Header>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile & Orders</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link>
                  <FaUser />
                </Nav.Link>
              </LinkContainer>
            )}

            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu' align="end">
                <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/productlist'>
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
