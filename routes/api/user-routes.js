const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    // access User Model and run .findAll() method
    // findAll() is a Model method and lets us query all of the users from the user table
    // equivalent of SELECT* FROM users;
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    // equivalent to SELECT * FROM users WHERE id = 1
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
});

// POST /api/users
router.post('/', (req, res) => {
    // expects {username: '', email: '', password: ''}
    // .create() takes a key/value pair using the keys estalished in User
    // works similar to the INSERT command in SQL
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

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // expects {username: '', email: '', password: ''}
    // update works like UPDATE in SQL
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
});

// DELETE /api/users/1
router.delete("/:id", (req, res) => {
    // destroy works like DELETE in SQL 
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No user found with this id' });
                return;
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

module.exports = router;