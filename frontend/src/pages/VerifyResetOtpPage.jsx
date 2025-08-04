import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';

const VerifyResetOtpPage = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      toast.error('No email address found. Please start over.');
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (otp && otp.length === 6) {
      navigate('/reset-password', { state: { email, otp } });
    } else {
      toast.error('Please enter a valid 6-digit OTP.');
    }
  };

  return (
    <FormContainer>
      <Meta title="Verify OTP" />
      <h2>Enter OTP</h2>
      <p>An OTP has been sent to <strong>{email}</strong>.</p>
      
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="otp" className="my-3">
          <Form.Label>One-Time Password (OTP)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength="6"
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-2">
          Proceed
        </Button>
      </Form>
    </FormContainer>
  );
};

export default VerifyResetOtpPage;
