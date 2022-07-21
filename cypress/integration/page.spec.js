describe('movies page tests', () => {
  const form = {
    fillAllFields() {
      return cy.getByDataCy('form-title')
               .type('movie-title') &&
             cy.getByDataCy('form-description')
               .type('movie-description') &&
             cy.getByDataCy('form-imgUrl')
               .type('movie-img') &&
             cy.getByDataCy('form-imdbUrl')
               .type('movie-url') &&
             cy.getByDataCy('form-imdbId')
               .type('movie-id');
    }
  }

  before('visit main page', () => {
    cy.visit('/');
  });

  it('should not reload the page after clicking submit button', () => {
    form.fillAllFields();
    cy.window()
      .then(w => w.beforeReload = true);
    cy.window()
      .should('have.prop', 'beforeReload', true);
    cy.getByDataCy('form-submit-button')
      .click();
    cy.window()
      .should('have.prop', 'beforeReload');
  });

  it('should clean the fields after clicking submit button', () => {
    form.fillAllFields();
    cy.getByDataCy('form-submit-button')
      .click();
    cy.getByDataCy('form-title')
      .should('be.empty');
    cy.getByDataCy('form-description')
      .should('be.empty');
    cy.getByDataCy('form-imgUrl')
      .should('be.empty');
    cy.getByDataCy('form-imdbUrl')
      .should('be.empty');
    cy.getByDataCy('form-imdbId')
      .should('be.empty');
  });

  it('should add the movie with the correct data', () => {
    form.fillAllFields();
    cy.getByDataCy('form-submit-button')
      .click();
    cy.get('.title')
      .eq(5)
      .should('have.text', 'movie-title');
    cy.get('.content')
      .eq(5)
      .should('contain', 'movie-description')
    cy.get(`a[href ="movie-url"]`)
      .should('exist');
  });
});

