const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const { post } = require('./user-routes');
const sequelize = require('../../config/connection');

// route will retreive all posts stored in api 
router.get('/', (req, res) => {
    Post.findAll({
        order: [['created_at', 'DESC']],
        attributes: [
            'id',
            'title',
            'post_content',
            'created_at',
            'post_category'
        ],
        include: [
          // all the models that the get all post will attach to it 
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        res.status(500).json(err);
    });
});

// sort posts by category 
router.get('/:post_category', (req, res) => {
  Post.findAll({
    where :{
      post_category: req.params.post_category
    },
      order: [['created_at', 'DESC']],
      attributes: [
          'id',
          'title',
          'post_content',
          'created_at',
          'post_category'
      ],
      include: [
        // include comments
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
      res.status(500).json(err);
  });
});

// retreive an specific posts from api 
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'post_content',
            'created_at',
            'post_category'
        ],
        include: [
          // include comments and user 
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //create post 

  router.post('/', (req, res) => {
    
    Post.create({
      title: req.body.title,
      post_content: req.body.post_content,
      post_category: req.body.post_category,
      // user_id: req.body.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
 
 //update posts content
  router.put('/:id', (req, res) =>{
      Post.update(
          {
              title: req.body.title
          },
          {
              where: {
                  id: req.params.id
              }
          }
      )
      .then(dbPostData => {
          if(!dbPostData) {
              res.status(404).json({message: "Post Not Found"});
              return;
          }
          res.json(dbPostData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
  });

  //delete posts 
  router.delete('/:id', (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'Post Not Found' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //export routes 
  module.exports = router;