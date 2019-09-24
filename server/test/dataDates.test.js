const chai = require("chai");
const chaiHTTP = require("chai-http");

const server = require("../app");
const Dates = require("../models/dtDates")

const should = chai.should()
chai.use(chaiHTTP)

describe('dtDates', function () {

    // untuk membersihkan documents di colection data
    Dates.collection.drop();

    // sebelum melakukan test saya menambahkan satu kata 'TDD Start Again'
    this.beforeEach(function (done) {

        let dates = new Dates({
            letter: "2010-07-12",
            frequency: 1.1
        })

        dates.save(function (err) {
            done();
        })
    })

    // setiap habis melakukan test saya kosongkan data di collection todo
    afterEach(function (done) {
        Dates.collection.drop()
        done();
    })



    it('seharusnya mendapatakan semua daftar tugas yang ada di table TODO dengan method GET', function (done) {
        chai.request(server)
            .get('/api/dataDates/')
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0].letter.should.equal('2010-07-12')
                res.body[0].frequency.should.equal(1.1);
                done()
            })
    })

    it('seharusnya dapat manambahkan satu data kedalam tabel menggunakan method POST', function (done) {
        chai.request(server)
            .post('/api/dataDates/add')
            .send({

                letter: "2019-11-20",
                frequency: 2.1
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
                res.body.data.letter.should.equal('2019-11-20')
                res.body.data.frequency.should.have.equal(2.1)
                done()
            })
    })

    it('Seharusnya dapat update/edit data table melalui path /api/dataDates/<id> menggunakan method PUT', function (done) {
        chai.request(server)
            .get('/api/dataDates/')
            .end(function (err, res) {
                chai.request(server)
                    .put('/api/dataDates/' + res.body[0]._id)
                    .send({

                        'letter': res.body[0].letter,
                        'frequency': res.body[0].frequency
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
                        res.body.data.letter.should.equal('2010-07-12');
                        res.body.data.frequency.should.equal(1.1);
                        done()

                    })
            })
    })



    it('seharusnya dapat menghapus data di table menggunakan method Delete', function (done) {
        chai.request(server)
            .get('/api/dataDates/')
            .end(function (err, res) {
                chai.request(server)
                    .delete('/api/dataDates/' + res.body[0]._id)
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
                        res.body.data.letter.should.equal('2010-07-12');
                        res.body.data.frequency.should.equal(1.1);
                        done()

                    })

            })
    })


    it('Seharusnya dapat Menampilkan data yang di cari/Browse dengan method POST', function (done) {
        chai.request(server)
            .get('/api/dataDates/')
            .end(function (err, res) {
                chai.request(server)
                    .post('/api/dataDates/search/')
                    .send({

                        'letter': '2010-07-12',
                        'frequency': 1.1
                    })
                    .end(function (err, res) {

                        res.should.have.status(201);
                        res.should.be.json;
                        res.body[0].should.be.a('object');
                        res.body[0].should.have.property('letter');
                        res.body[0].should.have.property('frequency');
                        res.body[0].should.have.property('_id');
                        res.body[0].letter.should.equal('2010-07-12');
                        res.body[0].frequency.should.equal(1.1);

                        done()

                    })
            })
    })


    it('Seharusnya dapat Menampilkan data menggunakan id dengan method GET', function (done) {
        chai.request(server)
            .get('/api/dataDates/')
            .end(function (err, res) {
                chai.request(server)
                    .get('/api/dataDates/'+ res.body[0]._id)
                    .send({

                        letter: "2010-07-12",
                        frequency: 1.1
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
                        res.body.data.letter.should.equal('2010-07-12');
                        res.body.data.frequency.should.equal(1.1);
                        done()

                    })
            })
    })


})