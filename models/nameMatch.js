// Load required packages
var mongoose = require('mongoose');

// Define our nameMatch schema
var nameMatchSchema = new mongoose.Schema({
	boy:  {
		type: String,
		required: true
	},
	girl:  {
		type: String,
		required: true
	}
});

// Export the Mongoose model
module.exports = mongoose.model('NameMatch', nameMatchSchema);