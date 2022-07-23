const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((res, res) => {
    res.statusCode(404).send(console.log('404 Error!'));
});

module.exports = router;