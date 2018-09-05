var mongoose = require('mongoose');
var configuration = require('./configuration');

mongoose.connect(configuration.database.berat.uri, configuration.database.berat.options)
.then(function(connect) {
	console.log("Connection Berat OK");
})
.catch(function(err) {
	console.log(err);
});

mongoose.connection.on('connected', function() {
	console.log('Mongoose default connection is open to Berat');
});

mongoose.connection.on('error', function(err) {
	console.log('Mongoose default connection error:' + err);
});

mongoose.connection.on('disconnected', function() {
	console.log('Mongoose default connection is disconnected.');
});

process.on('SIGINT', function() {
	mongoose.connection.close(function() {
		console.log('Mongoose default connection is disconnected due to application termination');
		process.exit(0);
	});
});

module.exports = mongoose.connection;