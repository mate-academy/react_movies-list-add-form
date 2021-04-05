import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

function validateUrlField(value) {
  return urlPattern.test(value);
}

function generateUrlPattern() {
  const patterns = '^((([A-Za-z]{3,9}:(?:\u005c/\u005c/)?)'
    + '(?:[-;:&=+$,\u005cw]+@)?[A-Za-z0-9.-]+|'
    + '(?:www\u005c.|[-;:&=+$,\u005cw]+@)[A-Za-z0-9.-]+)'
    + '((?:\u005c/[+~%/.\u005cw-_]*)?\u005c\u003f?'
    + '(?:[-+=&;%@.\u005cw_]*)#?(?:[.!/\u005c\u005c\u005cw]*))?)$';

  return new RegExp(patterns.replace(/[\u00A0-\uffff]/gu, (c) => {
    return `\\u${(`000${c.charCodeAt().toString(16)}`).slice(-4)}`;
  }));
}

const urlPattern = generateUrlPattern();

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    isImgUrlValid: true,
    imdbUrl: '',
    isImdbUrlValid: true,
    imdbId: '',
    validForm: false,
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  // We have to validate with pattern only two fields,
  // thats why the following method check a field by name at first
  // and change state (if needed) for one of them
  handleBlur = (e) => {
    const { name, value } = e.target;
    let fieldValid = true;

    fieldValid = validateUrlField(value);

    if (name === 'imgUrl') {
      if (fieldValid !== this.state.isImgUrlValid) {
        this.setState({
          isImgUrlValid: fieldValid,
        });
      }
    } else if (name === 'imdbUrl') {
      if (fieldValid !== this.state.isImdbUrlValid) {
        this.setState({
          isImdbUrlValid: fieldValid,
        });
      }
    }

    this.validate();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      title: this.state.title,
      description: this.state.title,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };

    this.props.onAdd(newItem);
    this.clearForm();
  }

  validate() {
    const {
      title,
      description,
      imdbId,
      imgUrl,
      isImgUrlValid,
      imdbUrl,
      isImdbUrlValid,
    } = this.state;

    const valid = title.length && description.length && imdbId.length
      && imgUrl.length && imdbUrl.length
      && (imgUrl.length && isImgUrlValid) && (imdbUrl.length && isImdbUrlValid);

    this.setState({
      validForm: valid,
    });
  }

  clearForm() {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      isImgUrlValid,
      imdbUrl,
      isImdbUrlValid,
      imdbId,
      validForm,
    } = this.state;

    return (
      <form className="form-container" onSubmit={this.handleSubmit}>
        <fieldset>
          <input
            type="text"
            className="form-field"
            name="title"
            placeholder="Add title"
            maxLength="35"
            value={title}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            required
          />
        </fieldset>

        <fieldset>
          <input
            type="text"
            className="form-field"
            name="description"
            placeholder="Add description"
            value={description}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            required
          />
        </fieldset>

        <fieldset>
          <input
            type="text"
            className={isImgUrlValid ? '' : 'form-field--invalid'}
            name="imgUrl"
            placeholder="Add image link"
            value={imgUrl}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            required
          />
          {!isImgUrlValid && (
            <p className="form-error-message">
              Image link is not valid.
            </p>
          )}
        </fieldset>

        <fieldset>
          <input
            type="text"
            className={isImdbUrlValid ? '' : 'form-field--invalid'}
            name="imdbUrl"
            placeholder="Add IMDB link"
            value={imdbUrl}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            required
          />
          {!isImgUrlValid && (
            <p className="form-error-message">
              IMDB link is not valid.
            </p>
          )}
        </fieldset>

        <fieldset>
          <input
            type="text"
            name="imdbId"
            placeholder="Edit IMDB ID"
            value={imdbId}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            required
          />
        </fieldset>

        <button type="submit" disabled={!validForm}>Add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
