const faker = require('faker')
const moment = require('moment')

const USER_GENDERS = ['Male', 'Female']
const qaPrefix = 'QATestUser'

const randomString = (length = 8) => {
  return faker.random.alphaNumeric(length)
}

const user = () =>{
  const lastName = faker.name.lastName()
  const myRandomNumber = faker.random.number(0,100)

  return {
    name: `${faker.name.firstName()} ${lastName}(${qaPrefix})`,
    gender: faker.random.arrayElement(USER_GENDERS),
    email: `${qaPrefix}-${lastName}-${randomString()}@example.com`,
    status: "Active"
  }
}

module.exports = {randomString, user}