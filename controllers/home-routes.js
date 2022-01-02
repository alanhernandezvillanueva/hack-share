const router = require("express").Router();

router.get("/login", (req, res) => {
  //render your handlebar file inside the {{{body}}}
  res.render("login");
});
router.get("/signup", (req, res) => {
  //render your handlebar file inside the {{{body}}}
  res.render("signup");
});
router.get("/", (req, res) => {
  //render your handlebar file inside the {{{body}}}
  res.render("homepage");
});
router.get("/search", (req, res) => {
  //render your handlebar file inside the {{{body}}}
  res.render("search");
});

module.exports = router;
