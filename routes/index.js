const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
  res.json("Hello World!");
  console.error(555)
});

module.exports = router;
