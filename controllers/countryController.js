const axios = require('axios');

// Fetch country details by currency code
exports.getCountryByCurrency = async (req, res) => {
    const { currencyCode } = req.params;

    try {
        const response = await axios.get(`https://restcountries.com/v3.1/currency/${currencyCode}`);
        const countries = response.data;

        if (countries.length === 0) return res.status(404).json({ message: 'No countries found' });

        res.json(countries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching country data' });
    }
};
