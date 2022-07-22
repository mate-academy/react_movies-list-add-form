import movies from '../../src/api/movies.json';

const page = {
  getByDataCy: (name) => cy.get(`[data-cy="${name}"]`),
  getMovies: () => page.getByDataCy('movie-card'),

  submitForm: () => {
    return page.getByDataCy('submit-button')
      .click({ force: true });
  },

  fillForm: (movie) => {
    const empty = '{selectAll}{del}';

    page.getByDataCy('movie-title')
      .type(movie.title || empty);

    page.getByDataCy('movie-description')
      .type(movie.description || empty);

    page.getByDataCy('movie-imgUrl')
      .type(movie.imgUrl || empty);

    page.getByDataCy('movie-imdbUrl')
      .type(movie.imdbUrl || empty);

    page.getByDataCy('movie-imdbId')
      .type(movie.imdbId || empty);
  },
};

describe('Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should add a movie with correct data', () => {
    const movie = {
      title: 'The Umbrella Academy',
      description: 'A family of former child heroes, now grown apart, must reunite to continue to protect the world.',
      imgUrl: 'https://m.media-amazon.com/images/M/MV5BOTdlODM0MTAtMzRiZi00MTQxLWE0MGUtNTNjOGZjNjAzN2E0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UY562_CR35,0,380,562_.jpg',
      imdbUrl: 'https://www.imdb.com/title/tt1312171',
      imdbId: 'tt1312171',
    };

    page.fillForm(movie);
    page.submitForm();

    page.getMovies()
      .should('have.length', movies.length + 1);

    page.getMovies()
      .last()
      .find('.title')
      .should('have.text', movie.title);

    page.getMovies()
      .last()
      .find('.content')
      .should('contain', movie.description);

    page.getMovies()
      .last()
      .find(`a[href="${movie.imdbUrl}"]`)
      .should('exist');
  });
  
  it('should not be reloaded', () => {
    const movie = {
      title: 'The Umbrella Academy',
      description: 'A family of former child heroes, now grown apart, must reunite to continue to protect the world.',
      imgUrl: 'https://m.media-amazon.com/images/M/MV5BOTdlODM0MTAtMzRiZi00MTQxLWE0MGUtNTNjOGZjNjAzN2E0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UY562_CR35,0,380,562_.jpg',
      imdbUrl: 'https://www.imdb.com/title/tt1312171',
      imdbId: 'tt1312171',
    };

    page.fillForm(movie);

    cy.window()
      .should('not.have.prop', 'beforeReload');

    cy.window()
      .then(w => w.beforeReload = true);

    page.submitForm();

    cy.window()
      .should('have.prop', 'beforeReload', true);
  });

  it('should clean the form after adding a movie', () => {
    const movie = {
      title: 'The Umbrella Academy',
      description: 'A family of former child heroes, now grown apart, must reunite to continue to protect the world.',
      imgUrl: 'https://m.media-amazon.com/images/M/MV5BOTdlODM0MTAtMzRiZi00MTQxLWE0MGUtNTNjOGZjNjAzN2E0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UY562_CR35,0,380,562_.jpg',
      imdbUrl: 'https://www.imdb.com/title/tt1312171',
      imdbId: 'tt1312171',
    };

    page.fillForm(movie);
    page.submitForm();

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

