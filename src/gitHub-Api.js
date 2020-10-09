const request = require('request-promise');

const HOST = "https://api.github.com";

class Api {
  constructor(host = HOST) {
    this.host = host;

    this.request = request.defaults({
      json: true,
      headers: {
        "Content-Type": 'application/json',
        "User-Agent": 'Awesome-Octocat-App'
      },
      rejectUnauthorized: false
    });
  }

  getApi(username) {
    const path =  `/users/${username}`

    return this.request.get({
      url: `${this.host}${path}`
    })
  }

}

module.exports = Api;