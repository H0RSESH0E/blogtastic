const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

router.get('/', (req,res) => {
    console.log('----------------------- localhost:3333 -----------------------')

    Post.findAll({
        attributes: ['id', 'title', 'content', 'user_id', 'created_at', 'updated_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(allPostData =>{
        const plainPostsData = allPostData.map(item => item.get({ plain: true }));
        console.log(plainPostsData);
        res.render('homepage', {
            plainPostsData,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log("home-routes: get'/' --- err: ", err);
        res.status(500).json(err);
    });
});

router.get('/individual-post', (req,res) => {
    Post.findOne({
        where: {
            id: req.body.id
        },
        attributes: ['id', 'title', 'content', 'user_id'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'content', 'user_id', 'post_id'],
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
    .then(singlePostData => {
        if (!singlePostData) {
            res.status(404).json({ message: 'No single post found with this id' });
            return;
          }

          const plainData = singlePostData.get({ plain: true });

          res.render('individual-post', {
              plainData,
              loggedIn: req.session.loggedIn
          });
    })
    .catch(err => {
        console.log("home-routes: get'/individual-post' --- err: ", err);
        res.status(500).json(err);
    });
});

router.get('/login', (req,res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;