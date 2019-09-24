const chai = require("chai");
const chaiHTTP = require("chai-http");

const server = require("../app");
const maps = require("../models/dtMaps")

const should = chai.should()
chai.use(chaiHTTP)

describe('dtMaps', function () {

    // untuk membersihkan documents di colection data
    maps.collection.drop();

    // sebelum melakukan test saya menambahkan satu kata untuk start
    this.beforeEach(function (done) {

        let dtMaps = new maps({
            title: "Trans Studio Mall Bandung",
            lat: -6.377878784,
            lng: 109.77878787

        })

        dtMaps.save(function (err) {
            done();
        })
    })

    // setiap habis melakukan test saya kosongkan data di collection
    afterEach(function (done) {
        maps.collection.drop()
        done();
    })


    it('seharusnya mendapatakan semua daftar tugas yang ada di table dengan method GET', function (done) {
        chai.request(server)
            .get('/api/dataMaps/')
            .end(function (err, res) {

                console.log(res.body);

                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('lat');
                res.body[0].should.have.property('lng');
                res.body[0].title.should.equal('Trans Studio Mall Bandung')
                res.body[0].lat.should.equal(-6.377878784);
                res.body[0].lng.should.equal(109.77878787);
                done()
            })
    })


    it('seharusnya dapat manambahkan satu data kedalam tabel menggunakan method POST', function (done) {
        chai.request(server)
            .post('/api/dataMaps/add')
            .send({

                title: "Bandung Indah Plaza",
                lat: -5.993822111,
                lng: 12.77878787
            })
            .end(function (err, res) {
                console.log(res.body);

                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.success.should.equal(true);
                res.body.message.should.equal('Success, Data have Been Add')
                res.body.data.title.should.equal('Bandung Indah Plaza')
                res.body.data.lat.should.have.equal(-5.993822111)
                res.body.data.lng.should.have.equal(12.77878787)
                done()
            })
    })



    it('Seharusnya dapat update/edit data table melalui path /api/dataDates/<id> menggunakan method PUT', function (done) {
        chai.request(server)
            .get('/api/dataMaps/')
            .end(function (err, res) {
                chai.request(server)
                    .put('/api/dataMaps/' + res.body[0]._id)
                    .send({

                        'title': res.body[0].title,
                        'lat': res.body[0].lat,
                        'lng': res.body[0].lng

                    })
                    .end(function (err, res) {

                        console.log(res.body);

                        res.should.have.status(201);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('success');
                        res.body.should.have.property('message');
                        res.body.should.have.property('data');
                        res.body.success.should.equal(true);
                        res.body.message.should.equal('Success, Data have Been Edit')
                        res.body.data.title.should.equal('Trans Studio Mall Bandung');
                        res.body.data.lat.should.equal(-6.377878784);
                        res.body.data.lng.should.equal(109.77878787);
                        done()

                    })
            })
    })


    it('seharusnya dapat menghapus data di table menggunakan method Delete', function (done) {
        chai.request(server)
            .get('/api/dataMaps/')
            .end(function (err, res) {
                chai.request(server)
                    .delete('/api/dataMaps/' + res.body[0]._id)
                    .end(function (err, res) {
                        console.log(res.body);

                        res.should.have.status(201);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('success');
                        res.body.should.have.property('message');
                        res.body.should.have.property('data');
                        res.body.success.should.equal(true);
                        res.body.message.should.equal('Success, Data have Been Removed')
                        res.body.data.title.should.equal('Trans Studio Mall Bandung');
                        res.body.data.lat.should.equal(-6.377878784);
                        res.body.data.lng.should.equal(109.77878787);
                        done()

                    })

            })
    })


    it('Seharusnya dapat Menampilkan data yang di cari/Browse dengan method POST', function (done) {
        chai.request(server)
            .get('/api/dataMaps/')
            .end(function (err, res) {
                chai.request(server)
                    .post('/api/dataMaps/search/')
                    .send({

                        'title': "Trans Studio Mall Bandung",
                        'lat': -6.377878784,
                        'lng': 109.77878787
                    })
                    .end(function (err, res) {
                        console.log(res.body);

                        res.should.have.status(201);
                        res.should.be.json;
                        res.body[0].should.be.a('object');
                        res.body[0].should.have.property('title');
                        res.body[0].should.have.property('lat');
                        res.body[0].should.have.property('lng');
                        res.body[0].title.should.equal('Trans Studio Mall Bandung')
                        res.body[0].lat.should.equal(-6.377878784);
                        res.body[0].lng.should.equal(109.77878787);

                        done()

                    })
            })
    })



    it('Seharusnya dapat Menampilkan data menggunakan id dengan method GET', function (done) {
        chai.request(server)
            .get('/api/dataMaps/')
            .end(function (err, res) {
                chai.request(server)
                    .get('/api/dataMaps/'+ res.body[0]._id)
                    .send({

                        title: "Trans Studio Mall Bandung",
                        lat: -6.377878784,
                        lng: 109.77878787
                    })
                    .end(function (err, res) {
                        console.log(res.body);
                        
                        res.should.status(201);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('success');
                        res.body.should.have.property('message');
                        res.body.should.have.property('data');
                        res.body.success.should.equal(true);
                        res.body.message.should.equal("succes!! Data Found");
                        res.body.data.title.should.equal('Trans Studio Mall Bandung');
                        res.body.data.lat.should.equal(-6.377878784);
                        res.body.data.lng.should.equal(109.77878787);
                        done()

                    })
            })
    })


})