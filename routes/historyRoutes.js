const express = require('express');
const { addSearchToHistory, getSearchHistory } = require('../controllers/historyController');
const authMiddleware = require('../middleware/auth');
// const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, addSearchToHistory);
router.get('/', authMiddleware, getSearchHistory);

module.exports = router;
