const express = require('express');
// const { getCountryByCurrency } = require('../controllers/countryController');
const authMiddleware = require('../middleware/auth');
const { getCountryByCurrency } = require('../controllers/countryController');

const router = express.Router();

router.get('/:currencyCode', authMiddleware, getCountryByCurrency);

module.exports = router;
