// package yang dibutuhkan
var configuration = require('./../configuration');

// koneksi ke database
var connection = require('./../connection');

// skema yang dibutuhkan
var BeratSchema = require('./../models/berat');

// aktifkan skema ke database
var Berat = connection.model('Berats', BeratSchema);


function BeratControllers() {
	this.getAll = function(req, res) {
		Berat
			.find()
			.sort('-tanggal')
			.exec(function(err, berat) {
				if (err) {
					res.json({status: {code: 500, success: false}, message: 'Ada kesalahan pada kueri.', err: err});
				} else if (berat == null || berat == 0) {
					res.json({status: {code: 204, success: false}, message: 'Tidak ada data.'});
				} else {
					res.json({status: {code: 200, success: true}, message: 'Data berhasil ditemukan.', data: berat});
				}
			})
	}

	this.getAverage = function(req, res) {
		Berat
			.aggregate([{
				$group: {
					'_id': null,
					rerata_max:  {
						$avg: '$max'
					},
					rerata_min:  {
						$avg: '$min'
					},
					rerata_selisih:  {
						$avg: '$selisih'
					}
				}
			}])
			.exec(function(err, berat) {
				if (err) {
					res.json({status: {code: 500, success: false}, message: 'Ada kesalahan pada kueri.', err: err});
				} else if (berat == null || berat == 0) {
					res.json({status: {code: 204, success: false}, message: 'Tidak ada data.'});
				} else {
					res.json({status: {code: 200, success: true}, message: 'Berhasil mendapatkan rerata', data: berat[0]});
				}
			})
	}

	this.getDetail = function(req, res) {
		let id = req.params.id;

		if (id == null) {
			res.json({status: {code: 400, success: false}, message: 'Ada kesalahan pada input.'});
		} else {
			Berat
				.findById(id)
				.exec(function(err, berat) {
					if (err) {
						res.json({status: {code: 500, success: false}, message: 'Ada kesalahan pada kueri.', err: err});
					} else if (berat == null || berat == 0) {
						res.json({status: {code: 204, success: false}, message: 'Tidak ada data.'});
					} else {
						res.json({status: {code: 200, success: true}, message: 'Berhasil mendapatkan rerata', data: berat});
					}
				})
		}
	}

	this.create = function(req, res) {
		let tanggal = req.body.tanggal;
		let max = Number(req.body.max);
		let min = Number(req.body.min);

		if (tanggal == null || max == null || min == null || max < min) {
			res.json({status: {code: 400, success: false}, message: 'Ada kesalahan pada input.'});
		} else {
			let selisih = Math.abs(max - min);
			Berat
				.create({
					tanggal: tanggal,
					max: max,
					min: min,
					selisih: selisih
				})
				.then(function(berat) {
					res.json({status: {code: 200, success: true}, message: 'Berhasil menambahkan data', data: berat});
				})
				.catch(function(err) {
					res.json({status: {code: 500, success: false}, message: 'Ada kesalahan pada kueri.', err: err});
				})
		}
	}

	this.edit = function(req, res) {
		let id = req.body.id;
		let tanggal = req.body.tanggal;
		let max = Number(req.body.max);
		let min = Number(req.body.min);

		if (id == null || tanggal == null || max == null || min == null || max < min) {
			res.json({status: {code: 400, success: false}, message: 'Ada kesalahan pada input.'});
		} else {
			let selisih = Math.abs(max - min);

			Berat
				.findById(id)
				.then(function(berat) {
					if (berat == null || berat == 0) {
						res.json({status: {code: 204, success: false}, message: 'Tidak ada data.'});
					} else {
						Berat
							.findByIdAndUpdate(id, {
								tanggal: tanggal,
								max: max,
								min: min,
								selisih: selisih
							})
							.then(function(berat) {
								res.json({status: {code: 200, success: true}, message: 'Berhasil mengubah data', data: berat});
							})
							.catch(function(err) {
								res.json({status: {code: 500, success: false}, message: 'Ada kesalahan pada kueri.', err: err});
							})
					}
				})
				.catch(function(err) {
					res.json({status: {code: 500, success: false}, message: 'Ada kesalahan pada kueri.', err: err});
				})
		}
	}

	this.edit = function(req, res) {
		let id = req.body.id;

		if (id == null) {
			res.json({status: {code: 400, success: false}, message: 'Ada kesalahan pada input.'});
		} else {
			Berat
				.findById(id)
				.then(function(berat) {
					if (berat == null || berat == 0) {
						res.json({status: {code: 204, success: false}, message: 'Tidak ada data.'});
					} else {
						Berat
							.findByIdAndRemove(id)
							.then(function(berat) {
								res.json({status: {code: 200, success: true}, message: 'Berhasil menghapus data', data: berat});
							})
							.catch(function(err) {
								res.json({status: {code: 500, success: false}, message: 'Ada kesalahan pada kueri.', err: err});
							})
					}
				})
				.catch(function(err) {
					res.json({status: {code: 500, success: false}, message: 'Ada kesalahan pada kueri.', err: err});
				})
		}
	}
}

module.exports = new BeratControllers();
