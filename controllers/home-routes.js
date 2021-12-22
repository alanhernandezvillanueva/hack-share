const router = require("express").Router();

router.get("/login", (req, res) => {
  //render your handlebar file insidet he {{{body}}}
  res.render("login");
});
router.get("/signup", (req, res) => {
  //render your handlebar file insidet he {{{body}}}
  res.render("signup");
});
router.get("/", (req, res) => {
  //render your handlebar file insidet he {{{body}}}
  res.render("homepage");
});
router.get("/search", (req, res) => {
  //render your handlebar file insidet he {{{body}}}
  res.render("search");
});

module.exports = router;
