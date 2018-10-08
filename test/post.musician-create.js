require("dotenv");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const mongoose = require("mongoose");
const db = require("../models");
const expect = chai.expect;

chai.use(chaiHttp);

var request;

describe("POST /api/musician", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  
  beforeEach(function() {
    request = chai.request(app);

     mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ensembleMe", {useNewUrlParser: true});
     mongoose.set("useCreateIndex", true);
     mongoose.set("useFindAndModify", false);
  });
  
  it("should create a new musician document in the database", function(done) {
    // Add some examples to the db to test with 
        let testMusician = {
          firstName: "John",
          lastName: "Doe",
          location: "Ontario, CN",
          instrumentsPlayed: [
               {
                    instrument: "trombone",
                    yearsExp: 3
               },
               {
                    instrument: "tuba",
                    yearsExp: 1
               },
               {
                    instrument: "guitar",
                    yearsExp: 5
               }
          ],
          videoUrl: "https://www.youtube.com/watch?v=A71aqufiNtQ",
          userInfo: "5bb56f9824b30b34881ef5c9"
        };
        // Run assertions on the response
        request
          .post(`/api/musicians`)
          .send(testMusician)
          .end((err, result)=>{
               var responseStatus = result.status;
               var responseBody = result.body;

               db.User.findById(responseBody.userInfo)
               .then(result=>{
                 // Run assertions on the response

                  expect(err).to.be.null;

                  expect(responseStatus).to.equal(200);

                  expect(responseBody)
                    .to.be.an("object")
                    .that.includes(testMusician);

                  expect(result)
                    .to.be.an("object")
                    .that.includes({
                      musicianInfo: responseBody._id
                    })
               })
          });

        // The `done` function is used to end any asynchronous tests
        done();
      });
});
