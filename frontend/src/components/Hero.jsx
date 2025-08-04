import React from 'react';
import { Container, Button } from 'react-bootstrap';

const Hero = () => {
  const heroStyle = {
    padding: '6rem 0',
    backgroundColor: '#2c3e50', 

    backgroundImage: `url('/images/hero-background.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '1.5rem',
    color: 'white',
    textAlign: 'left',
  };

  return (
    <div style={heroStyle} className='mb-5'>
      <Container>
        <h1 className='display-3' style={{ fontWeight: '700' }}>Shop Now</h1>
        <p className='lead' style={{ maxWidth: '500px' }}>
          Discover the latest trends in electronics, apparel, and home living. Quality products at unbeatable prices.
        </p>
        
        <a href="#featured-products">
          <Button variant="light" size="lg">
            Shop Now
          </Button>
        </a>
      </Container>
    </div>
  );
};

export default Hero;
