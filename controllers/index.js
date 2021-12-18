const router = require('express').Router();
const apiRoutes = require('./api');
const userRoutes = require('./user-routes');

router.use('/api', apiRoutes);
router.use('/', userRoutes);
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;