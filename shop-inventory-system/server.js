const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Importing the models
const Item = require('./models/Item');
const Bill = require('./models/Bill');

// Initializing the Express app
const app = express();

// Serve static files from the "public" directory
app.use(express.static('public'));

// Using body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));



// Add New Item to Inventory
app.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Retrieve All Items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a Bill
app.post('/bills', async (req, res) => {
  try {
    const { items } = req.body;
    let totalAmount = 0;

    for (let i = 0; i < items.length; i++) {
      const item = await Item.findById(items[i].itemId);
      if (!item || item.quantity < items[i].quantity) {
        return res.status(400).json({ error: 'Item not available or insufficient quantity' });
      }
      totalAmount += item.price * items[i].quantity;
      item.quantity -= items[i].quantity;
      await item.save();
    }

    const newBill = new Bill({ items, totalAmount });
    await newBill.save();
    res.status(201).json(newBill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve All Bills
app.get('/bills', async (req, res) => {
  try {
    const bills = await Bill.find().populate('items.itemId');
    res.status(200).json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Details of a Specific Bill
app.get('/bills/:id', async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id).populate('items.itemId');
    if (!bill) {
      return res.status(404).json({ error: 'Bill not found' });
    }
    res.status(200).json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
