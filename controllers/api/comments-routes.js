const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const validate = require('../../utils/validate');

router.post('/', validate, ({body, session}, res) => {
    console.log('888888888888888888888888888');
    Comment.create({
        content: body.content,
        user_id: session.user_id,
        post_id: body.post_id
      })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
})

module.exports = router;
