const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

// router.get("/login", (req, res) => {
//   //render your handlebar file inside the {{{body}}}
//   res.render("login");
// });
// router.get("/signup", (req, res) => {
//   //render your handlebar file inside the {{{body}}}
//   res.render("signup");
// });
// router.get("/", (req, res) => {
//   //render your handlebar file inside the {{{body}}}
//   res.render("homepage");
// });
// router.get("/search", (req, res) => {
//   //render your handlebar file inside the {{{body}}}
//   res.render("search");

// get all posts for homepage
router.get("/", (req, res) => {
  console.log("==");
  Post.findAll({
    attributes: ["id", "title", "post_content", "created_at"],
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

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/search", (req, res) => {
  res.render("search");
});
module.exports = router;
