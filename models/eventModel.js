const mongoose = require('mongoose');

const eventModel = mongoose.Schema({
    name: {type: String}
});

module.exports= mongoose.model('events', eventModel);
