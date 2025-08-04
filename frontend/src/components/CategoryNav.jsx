import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Container } from 'react-bootstrap';
import { 
  FaCoffee, 
  FaHome, 
  FaPuzzlePiece, 
  FaLeaf, 
  FaLaptop, 
  FaMobileAlt, 
  FaPaintBrush, 
  FaTshirt 
} from 'react-icons/fa';
import '../assets/styles/CategoryNav.css';

// --- This is your desired, full list of categories ---
const categories = [
  { name: 'Home', icon: <FaHome />, link: '/category/home' },
  { name: 'Toys', icon: <FaPuzzlePiece />, link: '/category/toys' },
  { name: 'Fresh', icon: <FaLeaf />, link: '/category/fresh' },
  { name: 'Electronics', icon: <FaLaptop />, link: '/category/electronics' },
  { name: 'Mobiles', icon: <FaMobileAlt />, link: '/category/mobiles' },
  { name: 'Beauty', icon: <FaPaintBrush />, link: '/category/beauty' },
  { name: 'Fashion', icon: <FaTshirt />, link: '/category/fashion' },
];

const CategoryNav = () => {
  return (
    <div className="category-nav-container">
      <Container className="d-flex justify-content-center">
        <Nav className="category-nav">
          {categories.map((category, index) => (
            <LinkContainer to={category.link} key={index}>
              <Nav.Link className="d-flex flex-column align-items-center category-link">
                <div className="category-icon">{category.icon}</div>
                <span className="category-name">{category.name}</span>
              </Nav.Link>
            </LinkContainer>
          ))}
        </Nav>
      </Container>
    </div>
  );
};

export default CategoryNav;
