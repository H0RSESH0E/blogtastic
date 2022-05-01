const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const validateLogin = require('../utils/validate');

router.get('/', validateLogin, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'title', 'content', 'user_id', 'created_at', 'updated_at'],
        include: {
            model: Comment,
            attributes: ['id', 'content', 'user_id', 'post_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    })
        .then(userPostsData => {
            const plainData = userPostsData.map(item => item.get({ plain: true }));
            console.log('---- 888888888 -------');
            console.log(plainData);
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

router.get('/edit/:id', validateLogin, (req, res) => {
    Post.findByPk(req.params.id, {
        attributes: [
            'id',
            'title',
            'content',
            'user_id',
            'created_at',
        ],
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
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });

                res.render('post-edit', {
                    post,
                    loggedIn: req.session.loggedIn
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;