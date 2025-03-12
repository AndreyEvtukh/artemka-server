const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
  res.send('GET home page');
  console.error(555)
});

module.exports = router;
