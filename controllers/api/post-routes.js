const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const { post } = require('./user-routes');
const sequelize = require('../../config/connection');

// find all of users posts 
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
          // include the Comment model here:
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
        // include the Comment model here:
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
          // include the Comment model here:
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
  //need to create a rating router
 //update posts information 
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
  module.exports = router;