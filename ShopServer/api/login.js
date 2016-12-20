const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
  res.json({
    code: 0,
    token: 'xxx',
  });
});

module.exports = router;
