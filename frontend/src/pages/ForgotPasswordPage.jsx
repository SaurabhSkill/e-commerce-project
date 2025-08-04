import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForgotPasswordRequestMutation } from '../slices/usersApiSlice';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Meta from '../components/Meta';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const [forgotPasswordRequest, { isLoading }] = useForgotPasswordRequestMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      
      const res = await forgotPasswordRequest({ email }).unwrap();
      
     
      toast.success(res.message);
      navigate('/verify-reset-otp', { state: { email } });

    } catch (err) {
 
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <Meta title="Forgot Password" />
      <h2>Forgot Password</h2>
      <p>Enter your email address and we'll send you an OTP to reset your password.</p>
      
      {isLoading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>
          Send OTP
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ForgotPasswordPage;
