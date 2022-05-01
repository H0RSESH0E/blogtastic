const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const validate = require('../../utils/validate');

router.post('/', ({body, session}, res) => {
  console.log(session);
    Post.create({
      title: body.postTitle,
      content: body.postContent,
      user_id: session.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  ({
    attributes: ['id', 'title', 'content', 'user_id', 'created_at', 'updated_at'],
    include: [
        {
            model: User,
            attributes: ['username']
        }
    ]
})


  router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'title', 'content', 'user_id', 'created_at', 'updated_at'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        console.log(dbPostData)
        const post = dbPostData.get({ plain: true });
        console.log('------------------------------------------------^^^^^^^^^^^-------------------------')
        console.log(post)


        res.render('individual-post', {
          post,
          loggedIn: req.session.loggedIn
      });

      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  

  module.exports = router;
