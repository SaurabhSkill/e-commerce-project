import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { Route } from 'react-router-dom';

const EmailVerification = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const { id, token } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/users/verify-email/${id}/${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess(true);
          setMessage('Email verified successfully! You can now login.');
          
    
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setSuccess(false);
          setMessage(data.message || 'Email verification failed.');
        }
      } catch (error) {
        setSuccess(false);
        setMessage('Something went wrong. Please try again.');
        console.error('Verification error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id && token) {
      verifyEmail();
    } else {
      setLoading(false);
      setSuccess(false);
      setMessage('Invalid verification link.');
    }
  }, [id, token, navigate]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="mt-5">
            <Card.Header className="text-center">
              <h3>Email Verification</h3>
            </Card.Header>
            <Card.Body className="text-center">
              {loading ? (
                <div>
                  <Spinner animation="border" role="status" className="mb-3">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <p>Verifying your email...</p>
                </div>
              ) : (
                <div>
                  <Alert variant={success ? 'success' : 'danger'}>
                    {message}
                  </Alert>
                  
                  {success ? (
                    <div>
                      <i className="fas fa-check-circle text-success" style={{ fontSize: '3rem' }}></i>
                      <p className="mt-3">Redirecting to login page...</p>
                    </div>
                  ) : (
                    <div>
                      <i className="fas fa-times-circle text-danger" style={{ fontSize: '3rem' }}></i>
                      <p className="mt-3">
                        <a href="/register">Try registering again</a> or{' '}
                        <a href="/contact">contact support</a>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
// In your App.js, add this route:
<Route path="/verify-email/:id/:token" element={<EmailVerification />} />
export default EmailVerification;