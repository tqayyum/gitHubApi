const Api = require('../src/gitHub-Api')
const { expect } = require('chai');
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should

chai.use(chaiHttp)

describe("GitHub User api", async () => {

  let api;

  before(async () => {
    api = new Api();
  })

  it.skip("Api property login - tqayyum", async () => {
    const response = await api.getApi();
    const expVal = 'tqayyum'

    expect(response.login).to.equal(expVal)
  })
  
  it.skip("Api property company - null", async () => {
    const response = await api.getApi();
    const expVal = null

    expect(response.company).to.equal(expVal)
  })

  it.skip("Api property site_admin - false", async () => {
    const response = await api.getApi();
    const expVal = false

    expect(response.site_admin).to.equal(expVal)
  })

  it.skip("Api property blog - empty", async () => {
    const response = await api.getApi();

    expect(response.blog).to.empty
  })

  // Negative Test
  it.skip("Api property site_admin - true", async () => {
    const response = await api.getApi();
    const expVal = true

    expect(response.site_admin).to.equal(expVal)
  })

  // Check api status code
  it("Api should return a status code of 200", function done () {
    const response = api.getApi();
    chai
      .request(api)
      .get(response)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        res.status.should.be.equal(200);
        return done();
      })
  })
})