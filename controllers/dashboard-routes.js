const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const validateLogin = require('../utils/validate');

router.get('/', validateLogin, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'title', 'content', 'user_id'],
        include: {
            model: Comment,
            attributes: ['id', 'content', 'user_id', 'post_id'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    })
    .then(userPostsData => {
        const plainData = userPostsData.map(item => item.get({ plain: true }));

        res.render('dashboard', {
            plainData,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log("dashboard-routes: get'/dashboard' --- err: ", err);
        res.status(500).json(err);
    })
});

router.get('/new-post', (req, res) => {  
    res.render('new-post');
  });





module.exports = router;