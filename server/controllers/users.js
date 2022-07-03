const bcrypt = require('bcryptjs');
const User = require('../models/User')
const jwt = require('jsonwebtoken')


exports.listUsers = async (req, res) => {
    try {
        // Code 
        const user = await User.find({}).select('-password').exec();
        res.send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send(' SERVER ERROR')

    }
};


exports.readUsers = async (req, res) => {
    try {
        // Code 
        const id = req.params.id
        const user = await User.findOne({ _id: id }).select('-password').exec();
        res.send(user);
    } catch (err) {
        console.log(err)
        res.status(500).send(' SERVER ERROR')

    }
};


exports.changeRole = async (req, res) => {
    try {
        // Code 
        // const id = req.params.id
        console.log(req.body)
        // const user = await User.findOneAndUpdate(
        //     { _id:req.body.id},
        //     {enable:req.body.enable}
        //     );
        // res.send(user);
    } catch (err) {
        console.log(err)
        res.status(500).send(' SERVER ERROR')

    }
};


exports.updateUsers = async (req, res) => {
    try {
        // Code 
        res.send('hello update users')
    } catch (err) {
        console.log(err)
        res.status(500).send(' SERVER ERROR')

    }
};



exports.removeUsers = async (req, res) => {
    try {
        // Code 
        const id = req.params.id
        const user = await User.findOneAndDelete({ _id: id }) ;
        res.send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send(' SERVER ERROR')

    }
};


