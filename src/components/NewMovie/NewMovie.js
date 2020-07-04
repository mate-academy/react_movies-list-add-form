import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NewMovieInput } from '../NewMovieInput/NewMovieInput';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleInput = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  onSubmittedMovie = (event) => {
    event.preventDefault();
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;
    const { addMovie } = this.props;

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    addMovie(movie);
    event.target.reset();
  }

  render() {
    return (
      <form
        onSubmit={event => this.onSubmittedMovie(event)}
        className="p-2 d-flex flex-column justify-content-center"
      >
        {Object.entries(this.state)
          .map(([key, value]) => (
            <NewMovieInput
              key={uuidv4()}
              name={key}
              value={value}
              handleInput={this.handleInput}
            />
          ))
        }
        <button
          type="submit"
          className="btn btn-primary"
        >
          Add movie
        </button>
      </form>
    );
  }
}
