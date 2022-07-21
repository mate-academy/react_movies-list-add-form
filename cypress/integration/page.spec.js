import movies from '../../src/api/movies.json';

const page = {
  getByDataCy: (name) => cy.get(`[data-cy="${name}"]`),
  getMovies: () => page.getByDataCy('movie-card'),

  fillTheForm() {
    page.getByDataCy('movie-title')
      .type('The Umbrella Academy');

    page.getByDataCy('movie-description')
      .type('movie-description');

    page.getByDataCy('movie-imgUrl')
      .type('https://m.media-amazon.com/images/M/MV5BOTdlODM0MTAtMzRiZi00MTQxLWE0MGUtNTNjOGZjNjAzN2E0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UY562_CR35,0,380,562_.jpg');

    page.getByDataCy('movie-imdbUrl')
      .type('https://www.imdb.com/title/tt1312171');

    page.getByDataCy('movie-imdbId')
      .type('tt1312171');
  }
};

describe('Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should add a movie with correct data', () => {
    page.fillTheForm();
    page.getByDataCy('submit-button')
      .click();

    page.getMovies()
      .should('have.length', movies.length + 1);

    page.getMovies()
      .last()
      .find('.title')
      .should('have.text', 'The Umbrella Academy');

    page.getMovies()
      .last()
      .find('.content')
      .should('contain', 'movie-description');

    page.getMovies()
      .last()
      .find('.content')

    page.getMovies()
      .last()
      .find(`a[href="https://www.imdb.com/title/tt1312171"]`)
      .should('exist');
  });
  
  it('should not be reloaded', () => {
    page.fillTheForm();

    cy.window()
      .should('not.have.prop', 'beforeReload');

    cy.window()
      .then(w => w.beforeReload = true);

    page.getByDataCy('submit-button')
      .click();

    cy.window()
      .should('have.prop', 'beforeReload', true);
  });

  it('should clean the form after adding a movie', () => {
    page.fillTheForm();
    page.getByDataCy('submit-button')
      .click();

    page.getByDataCy('movie-title')
      .should('be.empty');
    page.getByDataCy('movie-description')
      .should('be.empty');
    page.getByDataCy('movie-imgUrl')
      .should('be.empty');
    page.getByDataCy('movie-imdbUrl')
      .should('be.empty');
    page.getByDataCy('movie-imdbId')
      .should('be.empty');
  });
});

