import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input } from '../Input/Input';
import './NewMovie.scss';

const initialState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
  titleError: false,
  imgUrlError: false,
  imdbUrlError: false,
  imdbIdError: false,
};

// eslint-disable-next-line max-len
const patternUrl = '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)\n?[A-Za-z0-9.-]+|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)\n((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@.\\w_]*)#?\n(?:[.!/\\\\\\w]*))?)$';
const patternId = 'tt\\d{7}';

export class NewMovie extends Component {
  state = { ...initialState };

  handleChange = (event) => {
    const { name, value } = event.target;
    const errorKey = `${name}Error`;

    this.setState({
      [name]: value,
      [errorKey]: false,
    });
  }

  handleBlur = (event) => {
    const { name } = event.target;
    const errorKey = `${name}Error`;

    this.setState((state) => {
      const stateIs = !state[name].trim();
      const urlFormat = /Url/.test(name) && !state[name].match(patternUrl);
      const idFormat = name === 'imdbId' && !state[name].match(patternId);

      if (stateIs || urlFormat || idFormat) {
        return ({
          [errorKey]: true,
        });
      }

      return ({
        [errorKey]: false,
      });
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { titleError,
      imgUrlError,
      imdbUrlError,
      imdbIdError } = this.state;

    if (titleError || imgUrlError || imdbUrlError || imdbIdError) {
      return;
    }

    this.props.addMovie(this.state);
    this.setState({ ...initialState });
  }

  render() {
    const { title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      titleError,
      imgUrlError,
      imdbUrlError,
      imdbIdError } = this.state;

    const error = titleError || imgUrlError || imdbUrlError || imdbIdError;

    return (
      <form onSubmit={this.handleSubmit}>
        {error && <div className="error">Not valid input</div> }
        <Input
          name="title"
          value={title}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        <Input
          name="description"
          value={description}
          required={false}
          onChange={this.handleChange}
        />
        <Input
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        <Input
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        <Input
          name="imdbId"
          value={imdbId}
          title="Enter 7 digits"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        <button type="submit" className="button is-link">
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
