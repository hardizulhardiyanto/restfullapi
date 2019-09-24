const chai = require("chai");
const chaiHTTP = require("chai-http");

const server = require("../app");
const Todo = require("../models/data")

const should = chai.should()
chai.use(chaiHTTP)

describe('data', function () {
    // untuk membersihkan documents di colection data
    Todo.collection.drop();

    // sebelum melakukan test saya menambahkan satu kata 'TDD Start Again'
    this.beforeEach(function (done) {
        let todo = new Todo({
            letter: "Satu",
            frequency: 3.1
        })

        todo.save(function (err) {
            done();
        })
    })

    // setiap habis melakukan test saya kosongkan data di collection todo
    afterEach(function (done) {
        Todo.collection.drop()
        done();
    })

    it('seharusnya mendapatakan semua daftar tugas yang ada di table TODO dengan method GET', function (done) {
        chai.request(server)
            .get('/api/data/')
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0].letter.should.equal('Satu')
                res.body[0].frequency.should.equal(3.1);
                done()
            })
    })


    it('seharusnya dapat manambahkan satu data kedalam Todo menggunakan method POST', function (done) {
        chai.request(server)
            .post('/api/data/add')
            .send({

                'letter': 'Belajar TDD',
                'frequency': 1.1
            })
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('letter');
                res.body.should.have.property('frequency');
                res.body.letter.should.equal('Belajar TDD');
                res.body.frequency.should.equal(1.1);
                done()
            })
    })


    it('Seharusnya dapat update/edit data Todo melalui path /api/data/<id> menggunakan method PUT', function (done) {
        chai.request(server)
            .get('/api/data/')
            .end(function (err, res) {
                chai.request(server)
                    .put('/api/data/' + res.body[0]._id)
                    .send({

                        'letter': res.body[0].letter,
                        'frequency': res.body[0].frequency
                    })
                    .end(function (err, res) {

                        res.should.have.status(201);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('letter');
                        res.body.should.have.property('frequency');
                        res.body.should.have.property('_id');
                        res.body.letter.should.equal('Satu');
                        res.body.frequency.should.equal(3.1);
                        done()

                    })
            })
    })

    it('seharusnya dapat menghapus data di TODO menggunakan method Delete', function (done) {
        chai.request(server)
            .get('/api/data/')
            .end(function (err, res) {
                chai.request(server)
                    .delete('/api/data/' + res.body[0]._id)
                    .end(function (err, res) {

                        res.should.have.status(201);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('letter');
                        res.body.should.have.property('frequency');
                        res.body.should.have.property('_id');
                        res.body.letter.should.equal('Satu');
                        res.body.frequency.should.equal(3.1);
                        done()

                    })

            })
    })

    it('Seharusnya dapat Menampilkan data yang di cari/Browse dengan method POST', function (done) {
        chai.request(server)
            .get('/api/data/')
            .end(function (err, res) {
                chai.request(server)
                    .post('/api/data/search/')
                    .send({

                        'letter': 'Satu',
                        'frequency': 3.1
                    })
                    .end(function (err, res) {

                        res.should.have.status(201);
                        res.should.be.json;
                        res.body[0].should.be.a('object');
                        res.body[0].should.have.property('letter');
                        res.body[0].should.have.property('frequency');
                        res.body[0].should.have.property('_id');
                        res.body[0].letter.should.equal('Satu');
                        res.body[0].frequency.should.equal(3.1);

                        done()

                    })
            })
    })


    it('Seharusnya dapat Menampilkan data menggunakan id dengan method GET', function (done) {
        chai.request(server)
            .get('/api/data/')
            .end(function (err, res) {
                chai.request(server)
                    .get('/api/data/'+ res.body[0]._id)
                    .send({

                        letter: "Satu",
                        frequency: 3.1
                    })
                    .end(function (err, res) {
                        console.log(res.body);
                        
                        res.should.status(201);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('success');
                        res.body.should.have.property('message');
                        res.body.success.should.equal(true);
                        res.body.message.should.equal("succes!! Data Found");
                        res.body.Todo.letter.should.equal('Satu');
                        res.body.Todo.frequency.should.equal(3.1);
                        done()

                    })
            })
    })

})