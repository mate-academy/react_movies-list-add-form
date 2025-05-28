/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { NewMovie } from './NewMovie';

const page = {
  getByDataCy: name => cy.get(`[data-cy="${name}"]`),
  getError: name => {
    return page
      .getByDataCy(`movie-${name}`)
      .parents('.field')
      .find('.help.is-danger');
  },
  submitForm: () => {
    return page.getByDataCy('submit-button').click({ force: true });
  },

  fillForm: movie => {
    const empty = '{selectAll}{del}';

    page.getByDataCy('movie-title').type(movie.title || empty);

    page.getByDataCy('movie-description').type(movie.description || empty);

    page.getByDataCy('movie-imgUrl').type(movie.imgUrl || empty);

    page.getByDataCy('movie-imdbUrl').type(movie.imdbUrl || empty);

    page.getByDataCy('movie-imdbId').type(movie.imdbId || empty);
  },

  assertFormIsEmpty() {
    page.getByDataCy('movie-title').should('be.empty');
    page.getByDataCy('movie-description').should('be.empty');
    page.getByDataCy('movie-imgUrl').should('be.empty');
    page.getByDataCy('movie-imdbUrl').should('be.empty');
    page.getByDataCy('movie-imdbId').should('be.empty');
  },

  assertNoErrors() {
    page.getError('title').should('not.exist');
    page.getError('description').should('not.exist');
    page.getError('imgUrl').should('not.exist');
    page.getError('imdbUrl').should('not.exist');
    page.getError('imdbId').should('not.exist');
  },
};

describe('NewMovie', () => {
  let onAdd;

  beforeEach(() => {
    onAdd = cy.stub();

    cy.mount(<NewMovie onAdd={onAdd} />);
  });

  it('should have empty fields by default', () => {
    page.assertFormIsEmpty();
  });

  it('should not show errors by default', () => {
    page.assertNoErrors();
  });

  it('should allow to enter a title', () => {
    const title = 'The Umbrella Academy';

    page.getByDataCy('movie-title').type(title).should('have.value', title);
  });

  it('should allow to enter a description', () => {
    const description =
      'A family of former child heroes, now grown apart, must reunite to continue to protect the world.';

    page
      .getByDataCy('movie-description')
      .type(description)
      .should('have.value', description);
  });

  it('should allow to enter an imgUrl', () => {
    const imgUrl =
      'https://m.media-amazon.com/images/M/MV5BOTdlODM0MTAtMzRiZi00MTQxLWE0MGUtNTNjOGZjNjAzN2E0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UY562_CR35,0,380,562_.jpg';

    page.getByDataCy('movie-imgUrl').type(imgUrl).should('have.value', imgUrl);
  });

  it('should allow to enter an imdbUrl', () => {
    const imdbUrl = 'https://www.imdb.com/title/tt1312171';

    page
      .getByDataCy('movie-imdbUrl')
      .type(imdbUrl)
      .should('have.value', imdbUrl);
  });

  it('should allow to enter an imdbId', () => {
    const imdbId = 'tt1312171';

    page.getByDataCy('movie-imdbId').type(imdbId).should('have.value', imdbId);
  });

  it('should disable submit button by default', () => {
    page.getByDataCy('submit-button').should('be.disabled');
  });

  it('should enable submit button after entering all the required fields', () => {
    const movie = {
      title: 'The Umbrella Academy',
      description: '',
      imgUrl:
        'https://m.media-amazon.com/images/M/MV5BOTdlODM0MTAtMzRiZi00MTQxLWE0MGUtNTNjOGZjNjAzN2E0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UY562_CR35,0,380,562_.jpg',
      imdbUrl: 'https://www.imdb.com/title/tt1312171',
      imdbId: 'tt1312171',
    };

    page.fillForm(movie);

    page.getByDataCy('submit-button').should('not.be.disabled');
  });

  it('should show title error only after blur', () => {
    page.getByDataCy('movie-title').focus().type('1{backspace}');

    page.getError('title').should('not.exist');

    page.getByDataCy('movie-title').blur();

    page.getError('title').should('exist');
  });

  it('should not show description error when empty', () => {
    page.getByDataCy('movie-description').focus().type('1{backspace}').blur();

    page.getError('description').should('not.exist');
  });

  it('should show imgUrl error only after blur', () => {
    page.getByDataCy('movie-imgUrl').focus().type('1{backspace}');

    page.getError('imgUrl').should('not.exist');

    page.getByDataCy('movie-imgUrl').blur();

    page.getError('imgUrl').should('exist');
  });

  it('should show imdbUrl error only after blur', () => {
    page.getByDataCy('movie-imdbUrl').focus().type('1{backspace}');

    page.getError('imdbUrl').should('not.exist');

    page.getByDataCy('movie-imdbUrl').blur();

    page.getError('imdbUrl').should('exist');
  });

  it('should show imdbId error only after blur', () => {
    page.getByDataCy('movie-imdbId').focus().type('1{backspace}');

    page.getError('imdbId').should('not.exist');

    page.getByDataCy('movie-imdbId').blur();

    page.getError('imdbId').should('exist');
  });

  it('should clear the form after a successful submission', () => {
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

    page.assertFormIsEmpty();
  });

  it('should not clear the form if title is empty', () => {
    const movie = {
      title: '',
      description:
        'A family of former child heroes, now grown apart, must reunite to continue to protect the world.',
      imgUrl:
        'https://m.media-amazon.com/images/M/MV5BOTdlODM0MTAtMzRiZi00MTQxLWE0MGUtNTNjOGZjNjAzN2E0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UY562_CR35,0,380,562_.jpg',
      imdbUrl: 'https://www.imdb.com/title/tt1312171',
      imdbId: 'tt1312171',
    };

    page.fillForm(movie);
    page.submitForm();

    page
      .getByDataCy('movie-description')
      .should('have.value', movie.description);

    page.getByDataCy('movie-imgUrl').should('have.value', movie.imgUrl);

    page.getByDataCy('movie-imdbUrl').should('have.value', movie.imdbUrl);

    page.getByDataCy('movie-imdbId').should('have.value', movie.imdbId);
  });

  it('should not have errors after a successful submission', () => {
    page.assertNoErrors();
  });

  it('should call onAdd after a successful submission', () => {
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

    page.submitForm().then(() => {
      expect(onAdd).to.be.calledWith(movie);
    });
  });

  it('should call onAdd if description is empty', () => {
    const movie = {
      title: 'The Umbrella Academy',
      description: '',
      imgUrl:
        'https://m.media-amazon.com/images/M/MV5BOTdlODM0MTAtMzRiZi00MTQxLWE0MGUtNTNjOGZjNjAzN2E0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UY562_CR35,0,380,562_.jpg',
      imdbUrl: 'https://www.imdb.com/title/tt1312171',
      imdbId: 'tt1312171',
    };

    page.fillForm(movie);

    page.submitForm().then(() => {
      expect(onAdd).to.be.calledWith(movie);
    });
  });

  it('should not call onAdd if title is empty', () => {
    const movie = {
      title: '',
      description:
        'A family of former child heroes, now grown apart, must reunite to continue to protect the world.',
      imgUrl:
        'https://m.media-amazon.com/images/M/MV5BOTdlODM0MTAtMzRiZi00MTQxLWE0MGUtNTNjOGZjNjAzN2E0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UY562_CR35,0,380,562_.jpg',
      imdbUrl: 'https://www.imdb.com/title/tt1312171',
      imdbId: 'tt1312171',
    };

    page.fillForm(movie);

    page.submitForm().then(() => {
      expect(onAdd).not.to.be.called;
    });
  });

  it('should not call onAdd if imgUrl is empty', () => {
    const movie = {
      title: 'The Umbrella Academy',
      description:
        'A family of former child heroes, now grown apart, must reunite to continue to protect the world.',
      imgUrl: '',
      imdbUrl: 'https://www.imdb.com/title/tt1312171',
      imdbId: 'tt1312171',
    };

    page.fillForm(movie);

    page.submitForm().then(() => {
      expect(onAdd).not.to.be.called;
    });
  });

  it('should not call onAdd if imdbUrl is empty', () => {
    const movie = {
      title: 'The Umbrella Academy',
      description:
        'A family of former child heroes, now grown apart, must reunite to continue to protect the world.',
      imgUrl:
        'https://m.media-amazon.com/images/M/MV5BOTdlODM0MTAtMzRiZi00MTQxLWE0MGUtNTNjOGZjNjAzN2E0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UY562_CR35,0,380,562_.jpg',
      imdbUrl: '',
      imdbId: 'tt1312171',
    };

    page.fillForm(movie);

    page.submitForm().then(() => {
      expect(onAdd).not.to.be.called;
    });
  });

  it('should not call onAdd if imdbId is empty', () => {
    const movie = {
      title: 'The Umbrella Academy',
      description:
        'A family of former child heroes, now grown apart, must reunite to continue to protect the world.',
      imgUrl:
        'https://m.media-amazon.com/images/M/MV5BOTdlODM0MTAtMzRiZi00MTQxLWE0MGUtNTNjOGZjNjAzN2E0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UY562_CR35,0,380,562_.jpg',
      imdbUrl: 'https://www.imdb.com/title/tt1312171',
      imdbId: '',
    };

    page.fillForm(movie);

    page.submitForm().then(() => {
      expect(onAdd).not.to.be.called;
    });
  });
});
