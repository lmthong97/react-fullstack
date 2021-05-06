const express = require('express');
const router = express.Router();
const { Users} = require('../models');
const bcrypt = require('bcrypt');
const {validateToken} =require('../middlewares/AuthMiddleware')

const {sign} = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const {username, password} = req.body;
    bcrypt.hash(password, 10)
    .then((hash) => {
      Users.create({
          username,
          password: hash,
      });
      res.json('success')
    });
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    const user = await Users.findOne({where: {username: username}});
    if (!user) res.json({error: "User Doesn't Exist"});

    bcrypt.compare(password, user.password)
        .then((match) => {
            if(!match) res.json({error: "Wrong User And Password Combination!"})

            const accessToken = sign({
                username: user.username,
                id: user.id
            }, "importantsecret");
            res.json({token: accessToken, username: username, id: user.id});
        })
})

router.get('/auth', validateToken, (req, res) => {
  res.json(req.user);
})

module.exports = router;