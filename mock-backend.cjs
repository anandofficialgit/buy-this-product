const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8081;

// Middleware
app.use(cors());
app.use(express.json());

// Data storage
const dataFile = path.join(__dirname, 'data', 'users.json');

// Ensure data directory exists
const dataDir = path.dirname(dataFile);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize users file if it doesn't exist
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([], null, 2));
}

// Helper functions
const readUsers = () => {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeUsers = (users) => {
  fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
};

// API Routes
app.post('/api/users/signup', (req, res) => {
  try {
    const { name, mobileNumber, username, password } = req.body;
    
    // Validation
    if (!name || !mobileNumber || !username || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Mobile number validation
    const mobileRegex = /^[6-9][0-9]{9}$/;
    if (!mobileRegex.test(mobileNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number must be exactly 10 digits and start with 6, 7, 8, or 9'
      });
    }

    // Read existing users
    const users = readUsers();
    
    // Check for existing username or mobile number
    const existingUser = users.find(u => u.username === username || u.mobileNumber === mobileNumber);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Username or mobile number already exists'
      });
    }

    // Create new user
    const newUser = {
      name,
      mobileNumber,
      username,
      password,
      createdAt: new Date().toISOString()
    };

    // Save user
    users.push(newUser);
    writeUsers(users);

    // Return success response (without password)
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.json({
      success: true,
      message: 'Account created successfully!',
      data: userWithoutPassword
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create account: ' + error.message
    });
  }
});

app.post('/api/users/login', (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    const users = readUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      message: 'Login successful!',
      data: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed: ' + error.message
    });
  }
});

app.get('/api/users', (req, res) => {
  try {
    const users = readUsers();
    // Remove passwords from response
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);
    
    res.json({
      success: true,
      message: 'Users retrieved successfully',
      data: usersWithoutPasswords
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve users: ' + error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Mock backend server running on http://localhost:${PORT}`);
  console.log('Data file:', dataFile);
});
