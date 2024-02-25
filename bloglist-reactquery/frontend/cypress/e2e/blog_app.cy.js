Cypress.Commands.add('createUser', ({name, username, password}) => {
  const user = {
    name: name,
    username: username,
    password: password
  }
  cy.request('POST', 'http://localhost:3001/api/users', user)
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedinBlogUser', JSON.stringify(body))
    cy.visit('http://localhost:5173')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedinBlogUser')).token}`
    }
  })

  cy.visit('http://localhost:5173')
})

describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    
    cy.createUser({
      name: 'friday',
      username: 'friday',
      password: 'friday'
    })

    cy.createUser({
      name: 'saturday',
      username: 'saturday',
      password: 'saturday'
    })

    cy.visit('http://localhost:5173')

  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
    cy.contains('Blog app, 2024')
  })

  it('login form can be opened', function() {
    cy.get('#username').type('friday')
    cy.get('#password').type('friday')
    cy.get('#login').click()
    cy.contains('friday logged in')
  })

  //it.only('login expected to fail with wrong pw', function(){
  it('login expected to fail with wrong pw', function(){
    cy.get('#username').type('friday')
    cy.get('#password').type('monday')
    cy.get('#login').click()
    //cy.get('.error').contains('wrong credentials')
    cy.get('.error')
    .should('contain', 'wrong credentials')
    .and('have.css', 'border-style', 'solid')
    .and('have.css', 'color', 'rgb(255, 0, 0)' )

    //cy.get('html').should('not.contain', 'friday logged in')
    cy.contains('friday').should('not.exist')
  })

  describe('testing after-login, WITHOUT UI bypass ', function() {

    beforeEach(function() {
      cy.visit('http://localhost:5173')
      cy.get('#username').type('friday')
      cy.get('#password').type('friday')
      cy.get('#login').click()
      cy.contains('friday logged in')
    })
  
    it('new blog can be created, method 1', function() {
      cy.contains('Create New Blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('cypress.com')
      cy.get('#createBtn').click()
      cy.contains('Title: a blog created by cypress / By: Cypress')
    })
  
    it('new blog can be created, method 2', function () {
        cy.createBlog({
          title: 'testing is fun', 
          author: 'tester', 
          url: 'testingisfun.com'  
        })
    })
  
     it('blog can be liked', function () {
      cy.contains('Create New Blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('cypress.com')
      cy.get('#createBtn').click()
      cy.contains('Title: a blog created by cypress / By: Cypress')
      cy.get('#viewBtn').click();
      cy.contains('likes 0');
      cy.get('#likesBtn').click();
      cy.contains('likes 1');
    });
  })
  
  describe('testing after-login, WITH UI bypass ', function() {
  
    beforeEach(function() {
      cy.login({username: 'friday', password: 'friday'})
    })
  
    it('a new blog can be created, method 1', function() {
      cy.contains('Create New Blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('cypress.com')
      cy.get('#createBtn').click()
      cy.contains('Title: a blog created by cypress / By: Cypress')
    })
    
    it('new blog can be created, method 2', function () {
      cy.createBlog({
        title: 'testing is fun', 
        author: 'tester', 
        url: 'testingisfun.com'  
      })
    })
  
    it('blog can be liked', function () {
      cy.contains('Create New Blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('cypress.com')
      cy.get('#createBtn').click()
      cy.contains('Title: a blog created by cypress / By: Cypress')
      cy.get('#viewBtn').click();
      cy.contains('likes 0');
      cy.get('#likesBtn').click();
      cy.contains('likes 1');
    });
  })
 
  it.only('upon login, delete button & blog removal can only be done by its creator',
  function () {

    cy.get('#username').type('friday')
    cy.get('#password').type('friday')
    cy.get('#login').click()
    cy.contains('friday logged in')
    cy.createBlog({
        title: 'friday is fun', 
        author: 'friday', 
        url: 'testingisfun.com'  
    })
    cy.get('#logout').click()

    cy.get('#username').type('saturday')
    cy.get('#password').type('saturday')
    cy.get('#login').click()
    cy.contains('saturday logged in')
    cy.createBlog({
      title: 'saturday is fun', 
      author: 'saturday', 
      url: 'testingisfun.com'  
    })

    cy.contains('friday is fun')
    .find('#viewBtn')
    .click()
    .should('not.contain', 'Remove Blog')
    
    cy.contains('saturday is fun')
    .find('#viewBtn')
    .click()
    .parent()
    .should('contain', 'Remove Blog')
    .get('#remove').click()


    
  })

})


