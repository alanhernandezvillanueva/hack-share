const router = require('express').Router();
const { User } = require('../models');

// GET array of all user and except password
router.get('/api/users', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

// GET all infor from one user 
router.get('/:id', (req, res) => {
    User.findOne({
        attributes:{ exclude: ['password'] },
        where: {
            id: req.params.id
        },
        // include:[
        //     // models to be defined
        // ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });

});

// POST Create New Users 
router.post('/api/users', (req, res) => {
    //create new user and return a json object 
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});
// create the sign up and log in routes here

// PUT Update Users Info
router.put('/api/users/:id', (req, res) => {
User.update(req.body, {
    individualHooks: true,
    where: {
        id: req.params.id
    }
})
.then(dbUserData => {
    if (!dbUserData[0]){
        res.status(404).json ({message: 'No user found with this id'});
        return;
    }
    res.json(dbUserData);
})
.catch(err =>{
    console.log(err);
    res.status(500).json(err);
});
});

// DELETE Users
router.delete('/api/users/:id', (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;