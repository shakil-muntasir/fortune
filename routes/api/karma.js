const router = require('express').Router();

const Karma = require('../../models/karma');

router.get('/api/karma', async (req, res) => {
    const karmaData = await Karma.aggregate([ { $sample: { size: 1 } }]);

    return res.status(200).json(karmaData);
});

router.get('/api/karmas', async (req, res) => {
    const karmaData = await Karma.find();

    return res.status(200).json(karmaData);
});

module.exports = router;