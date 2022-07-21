/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { mount } from '@cypress/react';
import { NewMovie } from './NewMovie';

const page = {
  getByDataCy: name => cy.get(`[data-cy="${name}"]`),
};

describe('Button', () => {
  it('should call the onAdd function', () => {
    const onAdd = cy.stub();

    mount(<NewMovie onAdd={onAdd} />);

    page.getByDataCy('movie-title')
      .type('The Umbrella Academy');

    page.getByDataCy('movie-description')
      .type('A family of former child heroes, now grown apart, must reunite to continue to protect the world.');

    page.getByDataCy('movie-imgUrl')
      .type('https://m.media-amazon.com/images/M/MV5BOTdlODM0MTAtMzRiZi00MTQxLWE0MGUtNTNjOGZjNjAzN2E0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UY562_CR35,0,380,562_.jpg');

    page.getByDataCy('movie-imdbUrl')
      .type('https://www.imdb.com/title/tt1312171');

    page.getByDataCy('movie-imdbId')
      .type('tt1312171');

    page.getByDataCy('')
      .click()
      .then(() => {
        expect(onAdd)
          .to.be.called;
      });
  });
});
