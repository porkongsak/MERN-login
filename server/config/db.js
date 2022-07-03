const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('mongodb connect')
        
    }catch(err){
        console.log(err)
    
    }
}

module.exports = connectDB