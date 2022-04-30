const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const validate = require('../../utils/validate');

router.post('/login', ({body, session }, res) => {
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^ 999 ^^^^^^^^^^^^^^^^^^^^^^^^^^^');
    User.findOne({
        where: {
            email: body.email
        }
    })
      .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'The password or username is incorrect' });
            return;
          }

          const passwordValid = dbUserData.passwordCheck(body.password);

          if (!passwordValid) {
            res.status(400).json({ message: 'The password or username is incorrect' });
            return;
          }

          session.save(() => {
            session.user_id = dbUserData.id;
            session.username = dbUserData.username;
            session.loggedIn = true;
        
            res.json({ user: dbUserData, message: 'You have been logged in!' });
          })


      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.post('/', ({body, session}, res) => {
    User.create({
      username: body.username,
      email: body.email,
      password: body.password
    })
      .then(dbUserData => {
        session.save(() => {
          session.user_id = dbUserData.id;
          session.username = dbUserData.username;
          session.loggedIn = true;
    
          res.json(dbUserData);
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.post('/logout', ({session}, res) => {
    if (session.loggedIn) {
      session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });


  module.exports = router;
