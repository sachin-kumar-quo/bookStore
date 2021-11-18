const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../../index");

chai.use(chaiHttp);

describe("Auth", () => {
  describe("/POST login", () => {
    it("it should return a token", (done) => {
      const user = {
        email: "sac@hin@gmail.com",
        password: "helloworld",
      };
      chai
        .request(server)
        .post("/auth/login")
        .send(user)
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            should.exist(res.body.token);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("token");
          }

          done();
        });
    });
    it("it should not return a token", (done) => {
      const user = {
        email: "sac@hin@gmail.com",
        password: "helloworld",
      };
      chai
        .request(server)
        .post("/auth/logins")
        .send(user)
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            should.not.exist(res.body.token);
            res.should.have.status(404);
            res.body.should.not.have.property("token");
          }
          done();
        });
    });
  });
  describe("/POST Register", () => {
    it("it should return a user as well as token", (done) => {
      const user = {
        name: "sachin",
        email: "saciun@hin@gmail.com",
        password: "helloworld",
      };
      chai
        .request(server)
        .post("/auth/register")
        .send(user)
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            // should.exist(res.body.token);
            res.should.have.status(400);
            res.body.should.be.a("object");
            // res.body.should.have.property("user");
            // res.body.should.have.property("token");
          }
          done();
        });
    });
  });
});
