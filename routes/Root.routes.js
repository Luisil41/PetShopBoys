const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    const msg = 'Probando si funciona';

    return res.status(200).json(msg);
});

module.exports = router;
