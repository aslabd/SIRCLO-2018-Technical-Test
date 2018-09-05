module.exports = {
	database: {
		berat: {
			uri: 'mongodb://abdurrohim.id:27017/berat',
			options: {
				user: 'berat',
				pass: 'berat1234',
				autoIndex: false,
				autoReconnect: true,
				useNewUrlParser: true,
				reconnectTries: Number.MAX_VALUE,
				reconnectInterval: 500,
				poolSize: 5,
				bufferMaxEntries: 0
			}
		}
	}
}
