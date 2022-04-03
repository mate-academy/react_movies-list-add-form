import {newMovie} from './newMovie';

Cypress.Commands.add('getByDataCy', (selector) => {
    cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('fillTheFields', () => {
  cy.getByDataCy('form-title')
  .type(newMovie.title);
  cy.getByDataCy('form-description')
  .type(newMovie.description);
  cy.getByDataCy('form-imgUrl')
  .type(newMovie.imgUrl);
  cy.getByDataCy('form-imdbUrl')
  .type(newMovie.imdbUrl);
  cy.getByDataCy('form-imdbId')
  .type(newMovie.imdbId);
});
