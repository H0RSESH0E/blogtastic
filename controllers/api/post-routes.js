const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const validate = require('../../utils/validate');

router.post('/', ({body, session}, res) => {
  console.log(session);
    Post.create({
      title: body.title,
      content: body.content,
      user_id: session.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.post('/', ({body, session}, res) => {
    console.log(session);
      Post.create({
        title: body.title,
        content: body.content,
        user_id: session.user_id
      })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

  module.exports = router;
