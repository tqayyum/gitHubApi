const Api = require('../src/dummy-Api')
const {expect} = require('chai')
const randomName = ('../src/randomVar')
const randomSalary = ('../src/randomVar')
const randomAge = ('../src/randomVar')

describe("Dummy Api employee API", async ()=>{
  let api

  before(async()=>{
    api = new Api()
  })

  it.skip("Dummy Api Get Employee List (Get: /api/v1/employees )", async ()=>{
    const response = await api.getEmpList()
    console.log(response)
  })

  it("Dummy Api Get Employee By Id (Get: /api/v1/employees/{empId} )", async () => {

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

  it.("Dummy Api Create Employee (POST: /api/v1/create)", async ()=>{
    const empToBeCreated = {
      "name": `${randomName}`,
      "salary": `${randomSalary}`,
      "age": `${randomAge}`
    }

    const createEmpResponse = await api.createEmp(empToBeCreated)

    expect(createEmpResponse).to.have.property('status', 'success')
    expect(createEmpResponse).to.have.property('status').to.be.a('string')
  })

  it("Dummy Api Update Employee (PUT: /update/${empId})", async () =>{
    const empToBeCreated = {
      "name": `${Math.random().toString(36).slice(2)}`,
      "salary": `${Math.floor(Math.random() * 100000) + 1}`,
      "age": `${Math.floor(Math.random() * 100) + 1}`
    }

    const createEmpResponse = await api.createEmp(empToBeCreated)

    expect(createEmpResponse).to.have.property('status', 'success')
    expect(createEmpResponse).to.have.property('status').to.be.a('string')

    const empId = createEmpResponse.data.id

    const updatedEmpRecord = {
      "name": `updateName`,
      "salary": `100`,
      "age": `10`
    }

    const updateEmpResponse = await api.updateEmp(updatedEmpRecord, empId)

    expect(updateEmpResponse).to.have.property('status', 'success')
    expect(updateEmpResponse).to.have.property('status').to.be.a('string')

    expect(updateEmpResponse.data).to.have.property('name', updatedEmpRecord.name)
    expect(updateEmpResponse.data).to.have.property('name').to.be.a('string')

    expect(updateEmpResponse.data).to.have.property('salary', updatedEmpRecord.salary)
    expect(updateEmpResponse.data).to.have.property('salary').to.be.a('string')

    expect(updateEmpResponse.data).to.have.property('age', updatedEmpRecord.age)
    expect(updateEmpResponse.data).to.have.property('age').to.be.a('string')

    expect(updateEmpResponse).to.have.property('message', `Successfully! Record has been updated.`)
    expect(updateEmpResponse).to.have.property('message').to.be.a('string')

  })

  it("Dummy Api Delete Employee By ID  (DELETE: /delete/${empId})", async () =>{
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