import movies from '../../src/api/movies.json';

const page = {
  getMovies: () => cy.byDataCy('movie-card'),

  submitForm: () => {
    return cy.byDataCy('submit-button').click({ force: true });
  },

  fillForm: movie => {
    const empty = '{selectAll}{del}';

    cy.byDataCy('movie-title').type(movie.title || empty);
    cy.byDataCy('movie-description').type(movie.description || empty);
    cy.byDataCy('movie-imgUrl').type(movie.imgUrl || empty);
    cy.byDataCy('movie-imdbUrl').type(movie.imdbUrl || empty);
    cy.byDataCy('movie-imdbId').type(movie.imdbId || empty);
  },
};

describe('Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should add a movie with correct data', () => {
    const movie = {
      title: 'The Umbrella Academy',
      description:
        'A family of former child heroes, now grown apart, must reunite to continue to protect the world.',
      imgUrl:
        'https://m.media-amazon.com/images/M/MV5BOTdlODM0MTAtMzRiZi00MTQxLWE0MGUtNTNjOGZjNjAzN2E0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UY562_CR35,0,380,562_.jpg',
      imdbUrl: 'https://www.imdb.com/title/tt1312171',
      imdbId: 'tt1312171',
    };

    page.fillForm(movie);
    page.submitForm();

    page.getMovies().should('have.length', movies.length + 1);

    page.getMovies().last().find('.title').should('have.text', movie.title);

    page
      .getMovies()
      .last()
      .find('.content')
      .should('contain', movie.description);

    page.getMovies().last().find(`a[href="${movie.imdbUrl}"]`).should('exist');
  });

  it('should not be reloaded', () => {
    const movie = {
      title: 'The Umbrella Academy',
      description:
        'A family of former child heroes, now grown apart, must reunite to continue to protect the world.',
      imgUrl:
        'https://m.media-amazon.com/images/M/MV5BOTdlODM0MTAtMzRiZi00MTQxLWE0MGUtNTNjOGZjNjAzN2E0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UY562_CR35,0,380,562_.jpg',
      imdbUrl: 'https://www.imdb.com/title/tt1312171',
      imdbId: 'tt1312171',
    };

    page.fillForm(movie);

    cy.window().should('not.have.prop', 'beforeReload');

    cy.window().then(w => (w.beforeReload = true));

    page.submitForm();

    cy.window().should('have.prop', 'beforeReload', true);
  });

  it('should clean the form after adding a movie', () => {
    const movie = {
      title: 'The Umbrella Academy',
      description:
        'A family of former child heroes, now grown apart, must reunite to continue to protect the world.',
      imgUrl:
        'https://m.media-amazon.com/images/M/MV5BOTdlODM0MTAtMzRiZi00MTQxLWE0MGUtNTNjOGZjNjAzN2E0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UY562_CR35,0,380,562_.jpg',
      imdbUrl: 'https://www.imdb.com/title/tt1312171',
      imdbId: 'tt1312171',
    };

    page.fillForm(movie);
    page.submitForm();

    cy.byDataCy('movie-title').should('be.empty');
    cy.byDataCy('movie-description').should('be.empty');
    cy.byDataCy('movie-imgUrl').should('be.empty');
    cy.byDataCy('movie-imdbUrl').should('be.empty');
    cy.byDataCy('movie-imdbId').should('be.empty');
  });
});
