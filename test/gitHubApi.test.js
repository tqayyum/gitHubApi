const Api = require('../src/gitHub-Api')
const { expect } = require('chai');
const guard = require('../src/guard')

describe("GitHub User api", async () => {

  let api;

  before(async () => {
    api = new Api();
  })

  it.skip("Api property login - tqayyum", async () => {
    const expVal = 'tqayyum'
    const response = await api.getApi(expVal);
    console.log(response)

    expect(response).to.have.property('login',expVal)
    expect(response).to.have.property('company', null)
    expect(response.site_admin).to.equal(false)
    expect(response.blog).to.be.empty
  })
  
  it("", async ()=> {
    const response = await guard(async() => await api.getApi())
    
    console.log(response)
    // expect(error).to.eql(400)
    // expect(response).to.have.property('statusCode', 400)
  })

})