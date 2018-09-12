const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Nothing here, go to /api/events');
});

module.exports = router;
