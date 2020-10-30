import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';
import './NewMovie.scss';

export class NewMovie extends Component {
  initialtState = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  state = {
    ...this.initialtState,
  };

  saveMovieProperty = (name, value) => {
    this.setState({
      [name]: value,
    });
  }

  addMovie = (event) => {
    event.preventDefault();

    if (Object.values(this.state).every(value => value)) {
      this.props.addMovie({ ...this.state });

      this.setState({
        ...this.initialtState,
      });
    }
  }

  render() {
    return (
      <form className="needs-validation" onSubmit={this.addMovie}>
        {
          Object.keys(this.state).map(nameKey => (
            <Input
              key={nameKey}
              name={nameKey}
              value={this.state[nameKey]}
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
