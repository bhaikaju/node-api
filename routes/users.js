const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', async (req, res) => {
   const users = await User.find({});

   res.json(users);
})


module.exports = router;
