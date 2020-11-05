/* eslint-disable max-len */
import React, { Component } from 'react';
import { NewMovieTypes } from './NewMovieTypes';

import './NewMovie.scss';

const INITIAL_STATE = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
  errors: {
    validTitle: false,
    emptyTitle: false,
    validDescription: false,
    emptyDescription: false,
    validImgUrl: true,
    emptyImgUrl: false,
    validImdbUrl: true,
    emptyImdbUrl: false,
    validImdbId: true,
    emptyImdbId: false,
  },
  submitDisabled: true,
  uniqueImdbId: true,
};
const REGEXP_TITLE = /[^\w0-9 ]+/g;
const REGEXP_DESCRIPTION = /[^A-Za-z0-9 \n,'"-.]+/g;
const REGEXP_IMDBID = /^tt([0-9]{6,}\b)+/g;
const REGEXP_URL = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errors: {
      validTitle: false,
      emptyTitle: false,
      validDescription: false,
      emptyDescription: false,
      validImgUrl: true,
      emptyImgUrl: false,
      validImdbUrl: true,
      emptyImdbUrl: false,
      validImdbId: true,
      emptyImdbId: false,
    },
    submitDisabled: true,
    uniqueImdbId: true,
  };

  checkUniqueImdbId = () => {
    const { listImdbId } = this.props;

    this.setState(state => ({
      uniqueImdbId: !listImdbId.includes(state.imdbId),
    }));
  }

  validateForm = () => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      errors,
      uniqueImdbId,
    } = this.state;

    if (title && description && imgUrl && imdbUrl && imdbId) {
      if (!errors.validTitle && !errors.validDescription
      && errors.validImgUrl && errors.validImdbUrl
      && errors.validImdbId && uniqueImdbId) {
        return true;
      }
    }

    return false;
  }

  validate = (regexp, event) => {
    const { name, value } = event.target;

    this.setState(state => ({
      errors: {
        ...state.errors,
        [`valid${name}`]: (name === 'Title' || name === 'Description')
          ? value.match(regexp) : regexp.test(value),
      },
    }));
  }

  checkEmptyFailds = (event) => {
    const { name, value } = event.target;

    this.setState(state => ({
      errors: {
        ...state.errors,
        [`empty${name}`]: value === '',
      },
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.validateForm()) {
      this.props.onAdd(this.state);
      this.setState(INITIAL_STATE);
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    const key = name.split('').map((letter, index) => {
      if (index === 0) {
        return letter.toLowerCase();
      }

      return letter;
    }).join('');

    this.setState({
      [key]: value,
    });
  }

  handleDisabledSubmit = () => {
    if (this.validateForm()) {
      this.setState({
        submitDisabled: false,
      });
    }
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      errors,
      submitDisabled,
      uniqueImdbId,
    } = this.state;

    return (
      <form>
        <label>
          Title
          <input
            type="text"
            name="Title"
            value={title}
            placeholder="Title"
            style={{
              borderColor: errors.emptyTitle || errors.validTitle ? 'red' : '',
            }}
            onBlur={(event) => {
              this.checkEmptyFailds(event);
              this.validate(REGEXP_TITLE, event);
              this.handleDisabledSubmit();
            }}
            onChange={this.handleChange}
          />
        </label>
        <div className="error">
          {errors.emptyTitle && 'Please enter title'}
          {errors.validTitle && 'Special characters are not allowed'}
        </div>

        <label>
          Description
          <textarea
            name="Description"
            type="text"
            value={description}
            placeholder="Description"
            style={{
              borderColor: errors.emptyDescription || errors.validDescription ? 'red' : '',
            }}
            onBlur={(event) => {
              this.validate(REGEXP_DESCRIPTION, event);
              this.checkEmptyFailds(event);
              this.handleDisabledSubmit();
            }}
            onChange={this.handleChange}
          />
        </label>
        <div className="error">
          {errors.emptyDescription && 'Please enter description'}
          {errors.validDescription && 'Special characters are not allowed'}
          {}
        </div>

        <label>
          ImgUrl
          <input
            type="text"
            name="ImgUrl"
            value={imgUrl}
            placeholder="ImgUrl"
            style={{
              borderColor: errors.emptyImgUrl || !errors.validImgUrl ? 'red' : '',
            }}
            onBlur={(event) => {
              this.validate(REGEXP_URL, event);
              this.checkEmptyFailds(event);
              this.handleDisabledSubmit();
            }}
            onChange={this.handleChange}
          />
        </label>
        <div className="error">
          {errors.emptyImgUrl && 'Please enter ImgUrl'}
          {(!errors.validImgUrl && !errors.emptyImgUrl) && 'Special characters are not allowed'}
        </div>

        <label>
          ImdbUrl
          <input
            type="text"
            name="ImdbUrl"
            value={imdbUrl}
            placeholder="ImdbUrl"
            style={{
              borderColor: errors.emptyImdbUrl || !errors.validImdbUrl ? 'red' : '',
            }}
            onBlur={(event) => {
              this.checkEmptyFailds(event);
              this.validate(REGEXP_URL, event);
              this.handleDisabledSubmit();
            }}
            onChange={this.handleChange}
          />
        </label>
        <div className="error">
          {errors.emptyImdbUrl && 'Please enter ImdbUrl'}
          {(!errors.validImdbUrl && !errors.emptyImdbUrl) && 'Special characters are not allowed'}
        </div>

        <label>
          ImdbId
          <input
            type="text"
            name="ImdbId"
            value={imdbId}
            placeholder="ImdbId"
            style={{
              borderColor: errors.emptyImdbId || !errors.validImdbId ? 'red' : '',
            }}
            onBlur={(event) => {
              this.validate(REGEXP_IMDBID, event);
              this.checkEmptyFailds(event);
              this.handleDisabledSubmit();
              this.checkUniqueImdbId();
            }}
            onChange={this.handleChange}
          />
        </label>
        <div className="example">
          [Exp.: tt95430396016]
        </div>
        <div className="error">
          {errors.emptyImdbId && 'Please enter ImdbId'}
          {(!errors.emptyImdbId && !errors.validImdbId) && 'Special characters are not allowed'}
          {!uniqueImdbId && 'This ImdbId also exist. Please enter new ImdbId'}
        </div>

        <input
          type="submit"
          value="Add Movie"
          disabled={submitDisabled}
          onClick={this.handleSubmit}
        />
      </form>
    );
  }
}

NewMovie.propTypes = NewMovieTypes;
