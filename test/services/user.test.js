const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../../index");

chai.use(chaiHttp);

describe("User", () => {
  describe("/GET users", () => {
    it("it should GET all the users", (done) => {
      chai
        .request(server)
        .get("/user")
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("array");
          done();
        });
    });
  });
});
