

const express = require('express');
const mongoose  = require('mongoose');
require("dotenv").config()
const app = express();
const User = require('./models/User')

mongoose
.connect(process.env.DB_URI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ errorMsg: error.message})
    }
}

const getUserByName = async (req, res) => {
    const { name } = req.body
    try {
        const user = await User.find({ name: name})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ errorMsg: error.message})
    }
}

const createUser = async (req, res) => {
    const { name, age } = req.body

    try {
        const user = await User.create({ name: name, age: age})

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ errorMsg: error.message})
    }
}

const updateUserByName = async (req, res) => {
    const {name, age} = req.body

    try {
        const updatedUser = await User.update({ name: name }, { $set: { age: age } })

        res.status(200).json(updatedUser)

    } catch (error) {

        res.status(500).json({ errorMsg: error.message})
    }
}

const deleteUserByName = async (req, res) => {

    const {name} = req.body

    try {
        const deletedUser = await User.delete({ name: name})

        res.status(200).json(deletedUser)
    } catch(err) {
        res.status(500).json( { errorMsg: err.message})
    }
}

app.get('/', getUsers)
app.get('/getUsers', getUsers)
app.post('/', createUser)
app.put('/', updateUserByName)
app.delete('/', deleteUserByName)



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})