import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input } from '../Input';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleError: '',
    imgUrlError: '',
    imdbUrlError: '',
    imdbIdError: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { onAdd } = this.props;
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      titleError: '',
      imgUrlError: '',
      imdbUrlError: '',
      imdbIdError: '',
    });
  }

  validateInput = (event) => {
    const { name, value } = event.target;
    const valueToCheck = value.trim();

    if (!valueToCheck) {
      this.setState({
        [`${name}Error`]: 'empty',
      });

      return;
    }

    // eslint-disable-next-line max-len
    const urlRegex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if ((name === 'imgUrl' || name === 'imdbUrl') && !value.match(urlRegex)) {
      this.setState({
        [`${name}Error`]: 'invalid',
      });

      return;
    }

    this.setState({
      [`${name}Error`]: 'valid',
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      [`${name}Error`]: 'valid',
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      titleError,
      imgUrlError,
      imdbUrlError,
      imdbIdError,
    } = this.state;

    const isFormInvalid = titleError !== 'valid' || !title
      || imgUrlError !== 'valid' || !imgUrl
      || imdbUrlError !== 'valid' || !imdbUrl
      || imdbIdError !== 'valid' || !imdbId;

    return (
      <form
        className="NewMovie"
        name="newMovie"
        onSubmit={this.handleSubmit}
      >

        <Input
          inputName="title"
          value={title}
          onChange={this.handleChange}
          onBlur={this.validateInput}
          error={titleError}
        />

        <input
          className="NewMovie__input"
          type="text"
          name="description"
          placeholder="description"
          value={description}
          onChange={this.handleChange}
        />

        <Input
          inputName="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          onBlur={this.validateInput}
          error={imgUrlError}
        />

        <Input
          inputName="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          onBlur={this.validateInput}
          error={imdbUrlError}
        />

        <Input
          inputName="imdbId"
          value={imdbId}
          onChange={this.handleChange}
          onBlur={this.validateInput}
          error={imdbIdError}
        />

        <button
          className="NewMovie__submit"
          type="submit"
          disabled={isFormInvalid}
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
