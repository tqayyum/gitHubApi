const Api = require('../src/gitHub-Api')
const { expect } = require('chai');

describe("Dark Sky API", async () => {

  let api;

  before(async () => {
    api = new Api();
  })

  it.only("Can get forecast info", async () => {
    const response = await api.getApi();

    console.log(response);
  })

})