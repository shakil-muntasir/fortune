const router = require('express').Router();

const Fortune = require('../../models/fortune');

router.get('/api/fortune', async (req, res) => {
    const fortuneData = await Fortune.aggregate([{ $sample: { size: 1 } }]);

    return res.status(200).json(fortuneData);
});

router.get('/api/fortunes', async (req, res) => {
    const fortuneData = await Fortune.find();

    return res.status(200).json(fortuneData);
});

module.exports = router;