const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

//routed to access the home page with all posts and categories 
router.get("/", (req, res) => {
  
  Post.findAll({
    attributes: ["id", "title", "post_category", "post_content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      res.render("dashboard", { posts });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// unable to complete due to no having front end 
// router.get("/login", (req, res) => {
//   res.render("login");
// });

// router.get("/signup", (req, res) => {
//   res.render("signup");
// });

// router.get("/search", (req, res) => {
//   res.render("search");
// });
module.exports = router;
