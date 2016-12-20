const express = require('express');

const router = express.Router();

router.post('/register', (req, res) => {
  res.json({
    code: 0,
    token: 'xxx',
  });
});

module.exports = router;
