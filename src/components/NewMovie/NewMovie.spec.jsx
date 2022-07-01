/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { mount } from '@cypress/react';
import { NewMovie } from './NewMovie';

describe('Button', () => {
  const form = {
    fillAllFields() {
      return cy.getByDataCy('form-title')
        .type('movie-title')
        && cy.getByDataCy('form-description')
          .type('movie-description')
        && cy.getByDataCy('form-imgUrl')
          .type('movie-img')
        && cy.getByDataCy('form-imdbUrl')
          .type('movie-url')
        && cy.getByDataCy('form-imdbId')
          .type('movie-id');
    },
  };

  it('should call the onAdd function', () => {
    const onAdd = cy.stub();

    mount(<NewMovie onAdd={onAdd} />);

    form.fillAllFields();

    cy.get('button')
      .click()
      .then(() => {
        expect(onAdd).to.be.called;
      });
  });
});
