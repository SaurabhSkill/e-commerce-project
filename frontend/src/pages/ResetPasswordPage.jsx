import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useResetPasswordMutation } from '../slices/usersApiSlice';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Meta from '../components/Meta';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const email = location.state?.email;
  const otp = location.state?.otp;

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  useEffect(() => {
    if (!email || !otp) {
      toast.error('Invalid session. Please start over.');
      navigate('/forgot-password');
    }
  }, [email, otp, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    try {
      const res = await resetPassword({ email, otp, password }).unwrap();
      toast.success(res.message);
      navigate('/login');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <Meta title="Reset Password" />
      <h2>Reset Password</h2>
      
      {isLoading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3" disabled={isLoading}>
          Reset Password
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ResetPasswordPage;
