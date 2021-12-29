const router = require('express').Router();
const { User, Post } = require('../../models');
// const sequelize = require('../../config/connection');

// find all of users posts 
router.get('/', (req, res) => {
    Post.findAll({
        order: [['created_at', 'DESC']],
        attributes: [
            'id',
            'title',
            'post_content',
            'created_at',
        ],
        //create comments model ann insert it here 
        // include: [

        // ]
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
            'created_at'
        ],
        include: [
            //include comets to post as well, define first
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
    // expects {title: 'Taskmaster goes public!', postContent = description of the post', user_id: 1}
    Post.create({
      title: req.body.title,
      postContent: req.body.postContent,
      user_id: req.body.user_id
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