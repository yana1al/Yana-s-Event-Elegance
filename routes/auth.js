const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// POST /auth/signup
router.post('/signup', authController.signup);

// POST /auth/login
router.post('/login', authController.login);

router.post('/', (req, res) => {
    const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (email === 'example@email.com' && password === 'password') {
    
    return res.status(200).json({ message: 'Authentication successful' });
  } else {
    
    return res.status(401).json({ error: 'Invalid email or password' });
  }
   
  });

module.exports = router;
