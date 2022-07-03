const bcrypt = require('bcryptjs');
const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()
 
 exports.register = async(req, res) =>{
    try{
        // Check
        const { username, password, email } = req.body;
        var user = await User.findOne({ username });
        if(user){
            return res.status(400).send("User Already exists");
        }
        const salt = await bcrypt.genSalt(10);
        user = new User({
            username,
            email,
            password,
        });
        //Encrypt
        user.password  = await bcrypt.hash(password,salt);
        await user.save();
        res.send('Register Success');
    }catch(err){
        console.log(err)
        res.status(500).send(' SERVER ERROR')
        
    }
 }


 exports.login = async ( req, res ) => {
     try{
         const { email , password} = req.body;
         var user = await User.findOneAndUpdate({email},{ new: true});
         if(user && user.enabled){
            // Check password database
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(400).send('password invalid')
            }
            // Payload
            const payload = {
                user:{
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            }
            // Gennerate Token
            jwt.sign(payload,
                process.env.JWT,
                {expiresIn: 3600 },(err,token)=>{
                    if(err) throw err;
                    res.json({token, payload})
                });
                

         }else{
             return res.status(400).send('User not found!!')
         }

     }catch(err){
         console.log(err)
         res.status(500).send("Server Error")
     }
 }


exports.currentUser = async(req,res) => {
    try{
        // model User
        console.log('comtroller',req.user)
        const user = await User.findOne({ username:req.user.username })
        .select('-password').exec();
        res.send(user)

    }catch(err){
        console.log(err)
        res.status(500).send(' SERVER ERROR')
    }
}


 exports.listUser = async(req,res) =>{
    try{
        res.send('list get user')
    }catch(err){
        console.log(err)
        res.status(500).send(' SERVER ERROR')
    }
 }


 exports.editUser = async(req,res) =>{
    try{
        res.send('edit get user')
    }catch(err){
        console.log(err)
        res.status(500).send(' SERVER ERROR')
    }
 }



 exports.deleteUser = async(req,res) =>{
    try{
        res.send('remove get user')
    }catch(err){
        console.log(err)
        res.status(500).send(' SERVER ERROR')
    }
 }