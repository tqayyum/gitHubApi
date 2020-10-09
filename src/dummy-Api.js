const request = require('request-promise');

const HOST = "http://dummy.restapiexample.com/api/v1"

class Api {
  constructor(host = HOST){
    this.host = host

    this.request = request.defaults({
      json: true,
      header: {
        "Content-Type": 'application/json',
        "User-Agent": 'Awesome-Octocat-App'
      },
      rejectUnauthorized: false
    })
  }

  getEmpList(){
    const path = `/employees`
    
    return this.request.get({
      url: `${this.host}${path}`
    })
  }

  getEmpById(empId){
    const path = `/employee/${empId}`

    return this.request.get({
      url: `${this.host}${path}`
    })
  }

  createEmp(body){
    const path = `/create`

    return this.request.post({
      url: `${this.host}${path}`,
      body:body
    })
  }

  updateEmp(body, empId){
    const path = `/update/${empId}`

    return this.request.put({
      url: `${this.host}${path}`,
      body:body
    })
  }

  deleteEmp(empId){
    const path = `/delete/${empId}`

    return this.request.delete({
      url: `${this.host}${path}`
    })
  }
}

module.exports = Api