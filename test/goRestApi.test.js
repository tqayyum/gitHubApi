const Api = require('../src/goRestApi')
const factory = require('../src/factory/users-factory')
const guard = require('../src/utils/guard')
const wait = require('../src/utils/wait');
const { expect } = require('chai'); // Accessing expect from chai using object destructuring



describe("GoRest Users API", async () => {
  let api;

  before(async () => {
    api = new Api();
    api.authenticate();
  })

  afterEach(async () => {

    // Delete previously created users 
    const response = await api.getUsersList({ email: "QATestUser" });
    const usersToBeDeleted = response.data;
    if (response.data) {
      const arrayOfDeleteCallPromises = usersToBeDeleted.map(user => api.deleteUser(user.id))
      await Promise.all(arrayOfDeleteCallPromises)
    }
  })

  describe("GoRest Create Users (POST /public-api/users)", async () => {
    it("Can create a new user", async () => {
      
      const userToBeCreated = {
        ...factory.user(),
        name: "Tom Jones",
      }
      const userCreateResponse = await api.createUser(userToBeCreated);

      expect(userCreateResponse).to.have.property('code', 201)
      expect(userCreateResponse).to.have.property('meta', null)
      expect(userCreateResponse.data).to.have.property('id').to.be.a('number')

      expect(userCreateResponse.data).to.have.property('name', userToBeCreated.name)
      expect(userCreateResponse.data).to.have.property('name').to.be.a('string')
      
      expect(userCreateResponse.data).to.have.property('email', userToBeCreated.email)
      expect(userCreateResponse.data).to.have.property('email').to.be.a('string')

      expect(userCreateResponse.data).to.have.property('gender', userToBeCreated.gender)
      expect(userCreateResponse.data).to.have.property('gender').to.be.a('string')
      
      expect(userCreateResponse.data).to.have.property('status', userToBeCreated.status)
      expect(userCreateResponse.data).to.have.property('status').to.be.a('string')
      
      expect(userCreateResponse.data).to.have.property('created_at').to.be.a('string')
      expect(userCreateResponse.data).to.have.property('updated_at').to.be.a('string')

      
    });

    // Passed, failed, pending
    it("Error returned when creating a user and required properties are missing from the request payload", async() =>{

      const userToBeCreated = {
        ...factory.user(),
        name: "",
      }

      const userCreateResponse = await api.createUser(userToBeCreated);
      expect(userCreateResponse).to.have.property('code', 422)
    })


    it.skip("OPTIONAL: Can create multiple users in parallel", async () => {
      
      
      
      const generateRandomString = (length=6)=>Math.random().toString(20).substr(2, length)
      
      const userToBeCreated = {
        ...factory.user(),
        email: `QATestUser-${generateRandomString()}@example.com`,
      }

      const userCreateResponse = await api.createUser(userToBeCreated);
       const multiUser = async (num)  => {
        for (let i = 1; i <= num; i++) {
          
          generateRandomString()
          console.log(`${JSON.stringify(userCreateResponse)}`)
          // console.log(`${JSON.stringify(userCreateResponse.data.id)}`)
        }
        
      }

      await multiUser(2)
    })
  })

  describe("GoRest Get single user (GET /public-api/users/:id)", async () => {
    it("Can get single user by ID", async () => {

      // Using spread operator, you can create new object, add factory generated 
      // user to it and add or override properties of this new object
      const generatedUser = {
        ...factory.user(),
      };
      
      const userCreateResponse = await api.createUser(generatedUser);
      const getUserResponse = await api.getUser(userCreateResponse.data.id)

      expect(getUserResponse).to.have.property('code', 200)
      expect(getUserResponse.data).to.deep.equal(userCreateResponse.data)
    })

    it("Create new users, wait 2 seconds and get single user by ID", async () => {

      const generatedUser = {
        ...factory.user(),
      };
      const userCreateResponse = await api.createUser(generatedUser);

      // Wait 2 seconds using wait() function we created previously
      await wait(2000);

      const getUserResponse = await api.getUser(userCreateResponse.data.id)
      expect(getUserResponse).to.have.property('code', 200)
      expect(getUserResponse.data).to.deep.equal(userCreateResponse.data)
    })
  })

  describe("GoRest Get a list of users", async () => {
    it("Can get a list of users", async () => {
      const response = await api.getUsersList();

      // TODO: Add assertions
      expect(response).to.have.property('code', 200)
      expect(response).to.have.property('code').to.be.a('number')

      expect(response.meta.pagination).to.have.property('total', response.meta.pagination.total)
      expect(response.meta.pagination).to.have.property('total').to.be.a('number')

      expect(response.meta.pagination).to.have.property('pages', response.meta.pagination.pages)
      expect(response.meta.pagination).to.have.property('pages').to.be.a('number')

      expect(response.meta.pagination).to.have.property('page', response.meta.pagination.page)
      expect(response.meta.pagination).to.have.property('page').to.be.a('number')

      expect(response.meta.pagination).to.have.property('limit', response.meta.pagination.limit)
      expect(response.meta.pagination).to.have.property('limit').to.be.a('number')
    })

    // Fix the test by creating users before performing a test. Use factory, 
    // but override email property which you will need to use when getting a list of users filtered by email
    it("Can get a list of users filtered by email address", async () => {

      const userToBeCreated = {
        ...factory.user(),
      }
      await api.createUser(userToBeCreated);

      const response = await api.getUsersList({ email: "QATestUser" });
      // console.log('\x1b[36m%s\x1b[0m', JSON.stringify(response, null, 2));

      // TODO: Add assertions
      expect(response).to.have.property('code', 200)
      expect(response).to.have.property('code').to.be.a('number')

      expect(response.data[0].email).to.include('QATestUser')
      expect(response.data[0]).to.have.property('email').to.be.a('string')

    })

    it("Can get a list of users filtered by name", async () => {
      const userToBeCreated = {
        ...factory.user(),
        name: "Tom Jones"
      }
      await api.createUser(userToBeCreated);

      const response = await api.getUsersList({ name: "Tom Jones" });

      expect(response).to.have.property('code', 200)
      expect(response).to.have.property('code').to.be.a('number')

      expect(response.data[0].name).to.include('Tom Jones')
      expect(response.data[0]).to.have.property('name').to.be.a('string')

    })
    it("Can user pagination to iterate through the full list of users")
  });

  describe.skip("GoRest Update Users", async () => {
    it("Can update a user", async () => {
      // TODO: refactor to use factory function
      const userToBeCreated = {
        name: "Tenali O'Connel",
        gender: "Male",
        email: `${factory.randomString()}@example.com`,
        status: "Active"
      }
      const userCreateResponse = await api.createUser(userToBeCreated);

      const userToBeUpdated = {
        name: "Test name",
        gender: "Female",
        email: `${Math.random().toString(36).slice(2)}@example.com`,
        status: "Inactive"
      }

      const updatedUserResponse = await api.updateUser(userCreateResponse.data.id, userToBeUpdated)

      // Few ways to log deeply nested JS objects in console using JSON.stringify().
      // The first one adds color to the message.
      console.log('\x1b[36m%s\x1b[0m', JSON.stringify(userCreateResponse, null, 2));
      console.log(JSON.stringify(updatedUserResponse, null, 2));

      // TODO: Add assertions here
    })
    it("Can update single property of a user")
    it("Can NOT update ID of a user")
  })

  describe.skip("GoRest Delete Users", async () => {
    it("Can delete a user by id", async () => {
      const userToBeCreated = {
        name: "Tenali Ramakrishna",
        gender: "Male",
        email: `${Math.random().toString(36).slice(2)}@example.com`,
        status: "Active"
      }
      const userCreateResponse = await api.createUser(userToBeCreated);

      const deleteUserResponse = await api.deleteUser(userCreateResponse.data.id)
      console.log(deleteUserResponse)
      expect(deleteUserResponse).to.have.property('code', 204)
      expect(deleteUserResponse.data).to.be.null;
    })

    it('Error returned when deleting previously deleted user')
    it('Error returned when deleting a user using invalid user ID')
    it('Error returned when deleting a user and not passing a user ID')
  })

})