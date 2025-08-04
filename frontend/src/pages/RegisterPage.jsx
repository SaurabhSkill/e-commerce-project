import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col, InputGroup, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaEnvelope } from 'react-icons/fa';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Meta from '../components/Meta';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  // NEW STATE: Track if verification email was sent
  const [emailSent, setEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector(state => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    try {
      const res = await register({ name, email, password }).unwrap();
      toast.success(res.message);
      navigate('/verify-otp', { state: { email: res.email } });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (emailSent) {
    return (
      <FormContainer>
        <Meta title={'Email Verification'} />
        <div className="text-center">
          <FaEnvelope size={60} className="text-warning mb-4" />
          <h2>Check Your Email</h2>
          <Alert variant="info">
            <Alert.Heading>Verification Email Sent!</Alert.Heading>
            <p>
              We've sent a verification link to <strong>{userEmail}</strong>
            </p>
            <p>
              Please check your email and click the verification link to activate your account.
            </p>
            <hr />
            <p className="mb-0">
              <small>
                Didn't receive the email? Check your spam folder or{' '}
                <Button 
                  variant="link" 
                  className="p-0" 
                  onClick={() => {
                    setEmailSent(false);
                    setUserEmail('');
                    // Reset form
                    setName('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                  }}
                >
                  try again
                </Button>
              </small>
            </p>
          </Alert>
          
          <Row className="mt-4">
            <Col>
              <Link to="/login" className="btn btn-outline-primary">
                Back to Login
              </Link>
            </Col>
          </Row>
        </div>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <Meta title={'Register'} />
      <h1>Register</h1>
      {isLoading && <Loader />} 
      <Form onSubmit={submitHandler}></Form>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            type='text'
            placeholder='Enter name'
            onChange={e => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            type='email'
            placeholder='Enter email'
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder='Enter password'
              onChange={e => setPassword(e.target.value)}
            />
            <InputGroup.Text
              onClick={togglePasswordVisibility}
              id='togglePasswordVisibility'
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group className='mb-3' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              placeholder='Confirm password'
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <InputGroup.Text
              onClick={toggleConfirmPasswordVisibility}
              id='toggleConfirmPasswordVisibility'
              style={{ cursor: 'pointer' }}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Button
          className='mb-3 w-100'
          variant='warning'
          type='submit'
          disabled={isLoading}
        >
          Register
        </Button>
      </Form>
      <Row>
        <Col>
          Already have an account?
          <Link
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
            className=' mx-2'
          >
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;