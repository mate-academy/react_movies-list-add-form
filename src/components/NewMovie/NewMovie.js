import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';

const initialFields = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const initialErrors = {
  titleError: false,
  descriptionError: false,
  imgUrlError: false,
  imdbUrlError: false,
  imdbIdError: false,
};

export class NewMovie extends Component {
  state = {
    ...initialFields,
    ...initialErrors,
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

    Object.entries(newMovie).forEach((item) => {
      if (item[1] === '') {
        this.setState({
          [`${item[0]}Error`]: true,
        });
      }
    });

    const error = Object.entries(newMovie).some(item => item[1] === '');

    if (error) {
      return;
    }

    this.props.addMovie(newMovie);

    this.setState({
      ...initialFields,
    });
  }

  inputValue = (event) => {
    this.setState({
      [`${event.target.name}`]: event.target.value,
      [`${event.target.name}Error`]: false,
    });
  }

  render() {
    return (
      <form className="ui form" onSubmit={this.addNewMovie}>

        {Object.entries(initialFields).map(field => (
          <Input
            key={field[0]}
            inputValue={this.state.[field[0]]}
            inputName={field[0]}
            error={this.state.[`${field[0]}Error`]}
            addChange={this.inputValue}
          />
        ))}

        <button
          className="ui secondary button"
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
}.isRequired;
