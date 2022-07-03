const express = require('express');
const router = express.Router()

// controller
const { 
    listUsers,
    updateUsers,
    removeUsers,
    readUsers,
    changeRole
} = require("../controllers/users");

// middleware
const { auth,adminCheck  } = require('../middleware/auth');

// @Endpoint http://localhost:5000/api/users
// @Method  GET
// @Access  Publish
router.get("/users" , auth, adminCheck ,listUsers);


// @Endpoint http://localhost:5000/api/users
// @Method  GET
// @Access  Publish
router.get("/users/:id" , readUsers);


// @Endpoint http://localhost:5000/api/users
// @Method  PUT
// @Access  Publish
router.put("/users/:id" , updateUsers);



// @Endpoint http://localhost:5000/api/users
// @Method  DELETE
// @Access  Publish
router.delete("/users/:id" , removeUsers);




// @Endpoint http://localhost:5000/api/change-role
// @Method  POST
// @Access  Publish
router.post('/change-role',auth,adminCheck , changeRole );


module.exports = router