const jwt = require('jsonwebtoken');
 const User = require('../models/User')




exports.auth = (req, res, next) => {
    try{
        const token = req.headers["authtoken"];

        if(!token) {
            // ถ้าไม่มี token 
            return res.status(401).send(" no token, authorization denied");
        }
        // ถอดรหัส jwt
        const decoded = jwt.verify(token, process.env.JWT);
        console.log("middleware", decoded);
        req.user = decoded.user
        next()
    } catch (err){
        console.log(err);
        res.status(401).send("Token Invavid !!");
    }
};



exports.adminCheck = async(req, res, next) => {

    try {
      const { username } = req.user
      var adminUser = await User.findOne({ username }).exec();
      if(adminUser.role !== 'admin'){
        return res.status(403).send(err,'Admin Access denied')
      } else{
        next()
      }
     
    } catch (err) {
      console.log(err);
      res.status(401).send("Admin Access denied");
    }
  };

