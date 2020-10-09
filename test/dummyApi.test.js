const Api = require('../src/dummy-Api')
const {expect} = require('chai')
const randomVar = ('../src/randomVar.js')

describe("Dummy Api employee API", async ()=>{
  let api
  // created a random string
  // const randomName = Math.random().toString(36).slice(2)
  // const randomSalary = Math.floor(Math.random() * 100000) + 1
  // const randomNum = Math.floor(Math.random() * 100) + 1

  before(async()=>{
    api = new Api()
  })

  it("Get Employee List (Get: /api/v1/employees )", async ()=>{
    const response = await api.getEmpList()
    console.log(response)
  })

  it("Get Employee By Id (Get: /api/v1/employees/{empId} )", async () => {

    const responseGetEmpId = await api.getEmpById(2)

    const expData = {
      "status":"success",
      "id": 2,
      "employee_name": "Garrett Winters",
      "employee_salary": 170750,
      "employee_age": 63,
      "profile_image": "",
      "message": "Successfully! Record has been fetched."

    }

    expect(responseGetEmpId).to.have.property('status', expData.status)
    expect(responseGetEmpId).to.have.property('status').to.be.a('string')

    expect(responseGetEmpId.data).to.have.property('id', expData.id)
    expect(responseGetEmpId.data).to.have.property('id').to.be.a('number')

    expect(responseGetEmpId.data).to.have.property('employee_name', expData.employee_name)
    expect(responseGetEmpId.data).to.have.property('employee_name').to.be.a('string')

    expect(responseGetEmpId.data).to.have.property('employee_salary', expData.employee_salary)
    expect(responseGetEmpId.data).to.have.property('employee_salary').to.be.a('number')

    expect(responseGetEmpId.data).to.have.property('employee_age', expData.employee_age)
    expect(responseGetEmpId.data).to.have.property('employee_age').to.be.a('number')

    expect(responseGetEmpId.data).to.have.property('profile_image', expData.profile_image)

    expect(responseGetEmpId).to.have.property('message', expData.message)
    expect(responseGetEmpId).to.have.property('message').to.be.a('string')
  })

  it("Dummy Api Create Employee (POST: /api/v1/create)", async ()=>{
    const empToBeCreated = {
      "name": `${Math.random().toString(36).slice(2)}`,
      "salary": `${Math.floor(Math.random() * 100000) + 1}`,
      "age": `${Math.floor(Math.random() * 100) + 1}`
    }

    const createEmpResponse = await api.createEmp(empToBeCreated)

    expect(createEmpResponse).to.have.property('status', 'success')
    expect(createEmpResponse).to.have.property('status').to.be.a('string')
  })

  it.skip("Dummy Api Update Employee (PUT: /update/${empId})", async () =>{
    const empToBeCreated = {
      "name": `${Math.random().toString(36).slice(2)}`,
      "salary": `${Math.floor(Math.random() * 100000) + 1}`,
      "age": `${Math.floor(Math.random() * 100) + 1}`
    }

    const createEmpResponse = await api.createEmp(empToBeCreated)

    expect(createEmpResponse).to.have.property('status', 'success')
    expect(createEmpResponse).to.have.property('status').to.be.a('string')

    const empId = createEmpResponse.data.id
    const updateEmpResponse = await api.updateEmp(empId)

  })

  it("Dummy Api Delete By ID Employee (DELETE: /delete/${empId})", async () =>{
    const empToBeCreated = {
      "name": `${Math.random().toString(36).slice(2)}`,
      "salary": `${Math.floor(Math.random() * 100000) + 1}`,
      "age": `${Math.floor(Math.random() * 100) + 1}`
    }

    const createEmpResponse = await api.createEmp(empToBeCreated)

    expect(createEmpResponse).to.have.property('status', 'success')
    expect(createEmpResponse).to.have.property('status').to.be.a('string')

    const empId = createEmpResponse.data.id
    const deleteEmpResponse = await api.deleteEmp(empId)

    expect(deleteEmpResponse).to.have.property('status', 'success')
    expect(deleteEmpResponse).to.have.property('status').to.be.a('string')

    expect(deleteEmpResponse).to.have.property('message', `Successfully! Record has been deleted`)
    expect(deleteEmpResponse).to.have.property('message').to.be.a('string')
  })

})