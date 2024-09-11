const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors'); // Ensure cors is required
const jwt = require('jsonwebtoken');
const { exec } = require('child_process'); // Required for executing the Python script
const app = express();

// Use CORS middleware and configure it to allow requests from specific origins
app.use(cors({ 
  origin: 'http://localhost:3000', // Update this to your frontend's URL (in development, it's often http://localhost:3000)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true // Enable credentials (if you are using cookies or tokens)
}));

app.use(express.json()); // To handle JSON data in requests

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, // Admin field
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
});
const User = mongoose.model('User', userSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ 
    productId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  shippingAddress: { type: String, required: true },
});
const Order = mongoose.model('Order', orderSchema);

// Review Schema
const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: String, required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Review = mongoose.model('Review', reviewSchema);

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract the token
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.userId = decoded.userId; // Store userId in the request
    next(); // Move on to the next middleware
  } catch (err) {
    return res.status(400).json({ error: 'Invalid token.' });
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (!user.isAdmin) {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    next(); // User is admin, proceed to the next middleware or route handler
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

const adminAuth = [verifyToken, verifyAdmin];

function convertStringToNumber(str) {
  // Remove all dots from the string and convert to number
  const number = parseFloat(str.replace(/\./g, ''));
  return number;
}

//admin check
app.get('/api/admin/check', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.isAdmin) {
      return res.status(200).json({ isAdmin: true });
    } else {
      return res.status(403).json({ error: 'Access denied. Not an admin.' });
    }
  } catch (err) {
    console.error('Error checking admin status:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});


// Place order
app.post('/api/place-order', async (req, res) => {
  const { userId, items, status, shippingAddress } = req.body;
  const requestItems = items.map(item => {
    return {...item, price: convertStringToNumber(item.originalPrice), quantity: 1, productId: item.id}
  })
  const totalAmount = items.reduce((sum, item) => sum + convertStringToNumber(item.originalPrice), 0);
  console.log(req.body, "body here");
  try {
    const newOrder = new Order({
      user: userId,
      items: requestItems,
      totalAmount,
      status,
      shippingAddress,
      createdAt: new Date(),
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Error placing order' });
  }
});

// Get user orders
app.get('/api/user/:userId/orders', async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ user: userId }).populate('user');
    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
});

//order details
app.get('/api/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order by its ID
    const order = await Order.findById(orderId).populate('user').populate('items.productId');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error retrieving order:', error);
    res.status(500).json({ message: 'Server error while retrieving the order' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide both email and password' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token, userId: user._id, isAdmin: user.isAdmin });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Register route
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin routes protected by adminAuth middleware
app.get('/api/admin/orders', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().populate('user');
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.put('/api/admin/orders/:orderId', adminAuth, async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status; // Update status
    await order.save();
    res.json({ message: 'Order status updated successfully', order });
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Review routes
app.get('/api/admin/reviews', adminAuth, async (req, res) => {
  try {
    const reviews = await Review.find().populate('user');
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

app.delete('/api/admin/reviews/:reviewId', adminAuth, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.reviewId);
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error('Error deleting review:', err);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

// Submit a review for a completed order
app.post('/api/review', verifyToken, async (req, res) => {
  const { productId, reviewText, rating, orderId } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order || order.status !== 'Completed') {
      return res.status(400).json({ error: 'You cannot leave a review for a pending order' });
    }

    const review = new Review({
      user: req.userId,
      productId,
      reviewText,
      rating,
    });

    await review.save();
    res.status(201).json({ message: 'Review submitted successfully!', review });
  } catch (err) {
    console.error('Error submitting review:', err);
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

//route to get revelance score
// Route to get relevance score
app.post('/api/relevance-score', (req, res) => {
  const { reviewText } = req.body;

  if (!reviewText) {
    return res.status(400).json({ error: 'Review text is required' });
  }

  // Use the absolute path for the Python script
  const pythonScriptPath = '/Users/lamtran/Documents/ShopeeLite/shopeelite/backend/models/relevance_model.py';

  // Escape special characters in reviewText if necessary
  const reviewTextEscaped = reviewText.replace(/"/g, '\\"');

  // Execute the Python script with the absolute path
  exec(`python3 ${pythonScriptPath} "${reviewTextEscaped}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error.message}`);
      return res.status(500).json({ error: `Execution error: ${error.message}` });
    }

    if (stderr) {
      console.error(`Python script error: ${stderr}`);
      return res.status(500).json({ error: `Python script error: ${stderr}` });
    }

    try {
      const result = JSON.parse(stdout); // Parse the JSON output from Python
      res.json(result); // Send the relevance score to the frontend
    } catch (err) {
      console.error(`Error parsing Python script output: ${err.message}`);
      res.status(500).json({ error: 'Invalid response from AI model' });
    }
  });
});



app.listen(5002, () => console.log('Server running on port 5002'));