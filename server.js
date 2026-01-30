const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/tododb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Schema
const todoSchema = new mongoose.Schema({
    itemName: String,
    itemDescription: String
});

// Model
const Todo = mongoose.model('Todo', todoSchema);

// Route: /submittodoitem
app.post('/submittodoitem', async (req, res) => {
    const { itemName, itemDescription } = req.body;

    if (!itemName || !itemDescription) {
        return res.status(400).json({
            message: 'itemName and itemDescription are required'
        });
    }

    const todo = new Todo({
        itemName,
        itemDescription
    });

    await todo.save();

    res.status(201).json({
        message: 'To-Do item saved successfully',
        todo
    });
});

// Server start
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

