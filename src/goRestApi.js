require('dotenv').config()
const request = require('request-promise')

const {GOREST_APIKEY, GOREST_HOST} = process.env

class UsersApi {
  constructor(){
    this.host = GOREST_HOST
    this.request = request.defaults({
      json: true,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }, 
    })
  }

  authenticate(apiKey = GOREST_APIKEY){
    this.request = request.defaults({
      json: true,
      headers:{
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      }
    })
  }

  createUser(body){

    console.log(`${JSON.stringify(GOREST_HOST, GOREST_APIKEY)}`)
    const path = '/public-api/users'

    return this.request.post({
      url: `${this.host}${path}`,
      body
    })
  }

  getUser(userId) {
    const path = `/public-api/users/${userId}`;

    return this.request.get({
      url: `${this.host}${path}`
    })
  }

  getUsersList(queryStrings = {}) {
    const path = `/public-api/users`;

    return this.request.get({
      url: `${this.host}${path}`,
      qs: queryStrings
    })
  }

  updateUser(userId, body) {
    const path = `/public-api/users/${userId}`;

    return this.request.put({
      url: `${this.host}${path}`,
      body: body
    })
  }

  deleteUser(userId) {
    const path = `/public-api/users/${userId}`;

    return this.request.delete({
      url: `${this.host}${path}`
    })
  }
  
}

module.exports = UsersApi