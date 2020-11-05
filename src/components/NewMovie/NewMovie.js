import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';
import 'semantic-ui-css/semantic.min.css';

const fields = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const errors = {
  titleError: false,
  descriptionError: false,
  imgUrlError: false,
  imdbUrlError: false,
  imdbIdError: false,
};

export class NewMovie extends Component {
  state = {
    ...fields,
    ...errors,
  };

  addNewMovie = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    Object.entries(newMovie).forEach(([key, value]) => {
      if (value === '') {
        this.setState({
          [`${key}Error`]: true,
        });
      }
    });

    const hasError = Object.entries(newMovie)
      .some(([key, value]) => value === '');

    if (hasError) {
      return;
    }

    this.props.addMovie(newMovie);

    this.setState({
      ...fields,
    });
  }

  onChange = (event) => {
    this.setState({
      [`${event.target.name}`]: event.target.value,
      [`${event.target.name}Error`]: false,
    });
  }

  render() {
    return (
      <form
        className="ui form"
        onSubmit={this.addNewMovie}
      >
        {
          Object.entries(fields).map(([key, value]) => (
            <Input
              key={key}
              inputValue={this.state[key]}
              inputName={key}
              error={this.state[`${key}Error`]}
              addChange={this.onChange}
            />
          ))
        }

        <button
          className="ui primary basic button"
          type="submit"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
