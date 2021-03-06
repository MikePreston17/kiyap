const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schoolSchema = new Schema({
    name:{ type: String, required: true, dropDups: true, unique: true},
    address: { type: String, required: true, dropDups: true, unique: true },
    website: String,
    Phone: String,
    studentId: String,
    // owner: String,
    // location: Object, //geolocation
});

const School = mongoose.model("School", schoolSchema);
module.exports = School;