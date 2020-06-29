describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    const user = {
      username: 'ploplop',
      password: 'secret',
      name: 'Plop Lop',
    };

    cy.request('POST', 'http://localhost:3001/api/users', user);

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('log in to application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input:first').type('ploplop');
      cy.get('input:last').type('secret');
      cy.get('button').click();
      cy.contains('Plop Lop is logged in');
    });

    it('fails with wrong credentials', () => {
      cy.get('input:first').type('ploplop');
      cy.get('input:last').type('wrong');
      cy.get('button').click();

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');

      cy.get('html').should('not.contain', 'Plop Lop is logged in');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'ploplop', password: 'secret' });
    });

    it('A blog can be created', function () {
      cy.get('button').eq(1).click();
      cy.get('input').eq(0).type('Sample title');
      cy.get('input').eq(1).type('Sample author');
      cy.get('input:last').type('sample-url.com/');
      cy.get('#create-button').click();

      cy.contains('Sample title Sample author');
    });

    describe('A note exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Sample title',
          author: 'Sample author',
          url: 'sample-url.com/',
          likes: 4,
        });
        cy.createBlog({
          title: 'Second Sample title',
          author: 'Second Sample author',
          url: 'sample-url2.com/',
          likes: 2,
        });
        cy.createBlog({
          title: 'Third Sample title',
          author: 'Third Sample author',
          url: 'sample-url3.com/',
        });
      });

      it('can like a blog', function () {
        cy.get('.view-button:first').click();
        cy.get('.like-button:first').click();

        cy.contains('likes 5');
      });

      it('remove a user created blog', function () {
        cy.get('.view-button:first').click();
        cy.get('.remove-button:first').click();

        cy.get('html').should('not.contain', 'Sample title Sample author');
      });

      it('blogs are ordered by likes (decreasing)', function () {
        cy.get('.view-button:first').click();
        cy.contains('likes 4');
        cy.get('.view-button:first').click();
        cy.contains('likes 2');
        cy.get('.view-button:first').click();
        cy.contains('likes 0');
      });
    });
  });
});
