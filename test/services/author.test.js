const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../../index");

chai.use(chaiHttp);

describe("Author", () => {
  describe("/GET author", () => {
    it("it should GET all the authors", (done) => {
      chai
        .request(server)
        .get("/author")
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("array");
          done();
        });
    });
  });
  describe("/POST author", () => {
    it("it should not POST a author without name field", (done) => {
      let author = {
        email: "sachin@kumar.com",
        age: "23",
        phone: "1234567890",
      };
      chai
        .request(server)
        .post("/author")
        .send(author)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          done();
        });
    });
    it("it should not POST an author without email field", (done) => {
      let author = {
        name: "Sachin",
        age: "23",
        phone: "1234567890",
      };
      chai
        .request(server)
        .post("/author")
        .send(author)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          done();
        });
    });
    it("it should POST an author", (done) => {
      let author = {
        name: "Sachin",
        email: "kmr@sac.hin",
        age: "23",
        phone: "1234567890",
      };
      chai
        .request(server)
        .post("/author")
        .send(author)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("name");
          res.body.should.have.property("email");
          res.body.should.have.property("age");
          res.body.should.have.property("phone");
          done();
        });
    });
  });
});
