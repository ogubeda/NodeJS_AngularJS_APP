var router = require('express').Router();

router.use('/test_search', require('./test_search'));
router.use('/seed', require('./seed'))

module.exports = router;