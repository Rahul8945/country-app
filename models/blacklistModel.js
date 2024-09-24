const { Schema, model } = require('mongoose');

const blacklistSchema = new Schema({
    token: { type: String, required: true },
});

const blacklistModel = model('Blacklist', blacklistSchema);

module.exports = blacklistModel;
