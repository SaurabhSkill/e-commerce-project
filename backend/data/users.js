import bcryptjs from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@admin.com',
    password: bcryptjs.hashSync('admin123', 10),
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'john@email.com',
    password: bcryptjs.hashSync('john123', 10),
    isAdmin: false
  },
  {
    name: 'Alice Smith',
    email: 'alice@email.com',
    password: bcryptjs.hashSync('alice123', 10),
    isAdmin: false
  },
  {
    name: 'Eva Brown',
    email: 'eva@email.com',
    password: bcryptjs.hashSync('eva123', 10),
    isAdmin: false
  },
  {
    name: 'David Miller',
    email: 'david@email.com',
    password: bcryptjs.hashSync('david123', 10),
    isAdmin: false
  }
];

export default users;
