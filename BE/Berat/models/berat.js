var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Berat = new Schema({
	tanggal: { type: Date, required: true },
	max: { type: Number, required: true, min: 0 },
	min: { type: Number, required: true, min: 0 },
	selisih: { type: Number, required: true, min: 0 }
});

module.exports = Berat;