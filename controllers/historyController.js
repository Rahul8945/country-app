const History = require('../models/history');

// Add search to history (avoid duplicates)
exports.addSearchToHistory = async (req, res) => {
    const { currencyCode } = req.body;
    const userId = req.user.id;

    try {
        let history = await History.findOne({ userId });

        if (!history) {
            history = new History({ userId, searchHistory: [] });
        }

        if (!history.searchHistory.includes(currencyCode)) {
            history.searchHistory.unshift(currencyCode); // Add new search to front
            if (history.searchHistory.length > 5) {
                history.searchHistory.pop(); // Keep last 5 searches
            }
        }

        await history.save();
        res.status(201).json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error updating search history' });
    }
};

// Get search history
exports.getSearchHistory = async (req, res) => {
    const userId = req.user.id;

    try {
        const history = await History.findOne({ userId });
        res.json(history ? history.searchHistory : []);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching search history' });
    }
};
