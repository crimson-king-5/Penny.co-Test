const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

async function main() {
    try {
        await mongoose.connect('mongodb+srv://karimalhomsi:admin@cluster0.0fs0bx5.mongodb.net/crud', {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        console.log('✅ Connected to MongoDB Atlas');
    } catch (err) {
        console.error('Error in connexion to MongoDB :', err);
        process.exit(1);
    }
}

main();

const userSchema = new mongoose.Schema({name: String, age: Number});
const User = mongoose.model('User', userSchema);

app.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const saved = await newUser.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/users', async (req, res) => {
    const all = await User.find();
    res.json(all);
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});