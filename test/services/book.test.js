const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../../index");

chai.use(chaiHttp);

describe("Book", () => {
  describe("/GET book", () => {
    it("it should GET all the books", (done) => {
      chai
        .request(server)
        .get("/book")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  describe("/POST book", () => {
    it("it should not POST a book without title", (done) => {
      let book = {};
      chai
        .request(server)
        .post("/book")
        .send(book)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Internal Server Error");
          done();
        });
    });
  });
});
