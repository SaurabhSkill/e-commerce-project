import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useVerifyOtpMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Meta from '../components/Meta';

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();


  const email = location.state?.email;

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  useEffect(() => {
    if (!email) {
      toast.error('No email address found. Please register again.');
      navigate('/register');
    }
  }, [email, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP.');
      return;
    }
    try {
      const res = await verifyOtp({ email, otp }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
      toast.success('Account verified successfully! Welcome.');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <Meta title="Verify OTP" />
      <h2>Verify Your Account</h2>
      <p>An OTP has been sent to <strong>{email}</strong>. Please enter it below.</p>
      
      {isLoading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="otp" className="my-3">
          <Form.Label>One-Time Password (OTP)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength="6"
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>
          Verify & Login
        </Button>
      </Form>
    </FormContainer>
  );
};

export default VerifyOtpPage;