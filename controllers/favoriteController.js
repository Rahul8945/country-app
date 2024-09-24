const Favorite = require('../models/favorite');

// Add to favorites
exports.addFavorite = async (req, res) => {
    const { countryCode } = req.body;
    const userId = req.user.id;

    try {
        const favoriteExists = await Favorite.findOne({ userId, countryCode });
        if (favoriteExists) return res.status(400).json({ message: 'Already in favorites' });

        const newFavorite = new Favorite({ userId, countryCode });
        await newFavorite.save();

        res.status(201).json(newFavorite);
    } catch (error) {
        res.status(500).json({ message: 'Error adding favorite' });
    }
};

// Get all favorites
exports.getFavorites = async (req, res) => {
    const userId = req.user.id;

    try {
        const favorites = await Favorite.find({ userId });
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching favorites' });
    }
};
