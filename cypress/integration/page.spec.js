/// <reference types="cypress" />
/// <reference types="../support" />

import {newMovie} from '../support/newMovie'

describe('basic level tests', () => {
  before('visit main page', () => {
    cy.visit('/');
  });
  
  it('page hasn\'t been reloaded', () => {
    cy.fillTheFields();
    cy.window().then(w => w.beforeReload = true);
    cy.window().should('have.prop', 'beforeReload', true);
    cy.getByDataCy('form-submit-button').click();
    cy.window().should('have.prop', 'beforeReload');
  });

  it('fields has been cleaned', () => {
    cy.fillTheFields();
    cy.getByDataCy('form-submit-button').click();
    cy.getByDataCy('form-title').should('be.empty');
    cy.getByDataCy('form-description').should('be.empty');
    cy.getByDataCy('form-imgUrl').should('be.empty');
    cy.getByDataCy('form-imdbUrl').should('be.empty');
    cy.getByDataCy('form-imdbId').should('be.empty');
  });

  it('movie has been added with the correct data', () => {
    cy.fillTheFields();
    cy.getByDataCy('form-submit-button').click();
    cy.get(`:nth-child(6) > .card-image > .image > img[src="${newMovie.imgUrl}"]`)
      .should('exist');
    cy.get(':nth-child(6) > .card-content > .media > .media-content > .title')
      .should('have.text', newMovie.title);
    cy.get(':nth-child(6) > .card-content > .content')
      .should('contain', newMovie.description)
    cy.get(`a[href ="${newMovie.imdbUrl}"]`)
      .should('exist');
  }); 
});

describe('advanced level tests', () => {
  before('visit main page', () => {
    cy.visit('/');
  });

  it('title field is required', () => {
    cy.getByDataCy('form-imgUrl')
      .type(newMovie.imgUrl);
    cy.getByDataCy('form-imdbUrl')
      .type(newMovie.imdbUrl);
    cy.getByDataCy('form-imdbId')
      .type(newMovie.imdbId);
    cy.getByDataCy('form-submit-button')
     .should('have.attr', 'disabled')
  });

  it('empty title field has a red border error', () => {
    cy.getByDataCy('form-title').click();
    cy.getByDataCy('form-description').click();
    cy.getByDataCy('form-title')
      .should('have.css', 'border-color', 'rgb(255, 0, 0)');
  });
  
  it('empty title field has an error message', () => {
    cy.getByDataCy('form-title').click();
    cy.getByDataCy('form-description').click();
    cy.get('.NewMovie > :nth-child(1)')
      .should('contain','This field is required')
  });

  it('title field becomes normal when value has been inputed', () => {
    cy.getByDataCy('form-title').click();
    cy.getByDataCy('form-description').click();
    cy.getByDataCy('form-title')
      .type('title')
      .should('not.have.css', 'border-color', 'rgb(255, 0, 0)');
  });

  it('imgUrl field doesn\'t accept incorrect value', () => {
    cy.getByDataCy('form-imgUrl')
      .type('incorrect value')
    cy.get('.NewMovie > :nth-child(3)')
      .contains('Url is not correct', { matchCase: false });
  });
});
