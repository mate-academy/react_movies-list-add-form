import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';
import './NewMovie.scss';

const initialtState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export class NewMovie extends Component {
  state = {
    inputValues: initialtState,
    inputErrors: initialtState,
  };

  saveMovieProperty = (name, error = '') => {
    this.setState((prevState) => {
      return {
        inputValues: {
          ...prevState.inputValues,
          [name]: prevState.inputValues[name],
        },
        inputErrors: {
          ...prevState.inputErrors,
          [name]: error,
        },
      };
    });
  }

  addMovie = (event) => {
    event.preventDefault();

    if (Object.values(this.state.inputErrors).every(error => !error)
      && Object.values(this.state.inputValues).every(value => value)) {
      this.props.addMovie({ ...this.state.inputValues });

      this.setState({
        inputValues: initialtState,
        inputErrors: initialtState,
      });
    }
  }

  changeInputValue = (event, name) => {
    const { value } = event.target;

    this.setState((prevState) => {
      return {
        inputValues: {
          ...prevState.inputValues,
          [name]: value,
        },
      };
    });
  }

  render() {
    return (
      <form className="needs-validation" onSubmit={this.addMovie}>
        {
          Object.keys(this.state.inputValues).map(key => (
            <Input
              key={key}
              name={key}
              value={this.state.inputValues[key]}
              error={this.state.inputErrors[key]}
              changeValue={this.changeInputValue}
              saveValue={this.saveMovieProperty}
            />
          ))
        }

        <button
          type="submit"
          className="btn btn-primary w-100"
        >
          add new movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
