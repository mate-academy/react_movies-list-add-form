import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';
import './NewMovie.scss';

const initialtState = {
  title: null,
  description: null,
  imgUrl: null,
  imdbUrl: null,
  imdbId: null,
};

export class NewMovie extends Component {
  state = {
    ...initialtState,
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
        ...initialtState,
      });
    }
  }

  render() {
    return (
      <form className="needs-validation" onSubmit={this.addMovie}>
        {
          Object.keys(this.state).map(key => (
            <Input
              key={key}
              name={key}
              value={this.state[key]}
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
