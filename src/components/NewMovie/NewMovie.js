import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { addMovie } = this.props;

    addMovie(this.state);
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
      imdbId,
      imdbUrl,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <p>
          <label>
            {'Title: '}
            <input
              type="text"
              value={title}
              onChange={(event) => {
                this.setState({ title: event.target.value });
              }}
            />
          </label>
        </p>
        <p>
          <label>
            {'Description: '}
            <input
              type="text"
              value={description}
              onChange={(event) => {
                this.setState({ description: event.target.value });
              }}
            />
          </label>
        </p>
        <p>
          <label>
            {'imgUrl: '}
            <input
              type="text"
              value={imgUrl}
              onChange={(event) => {
                this.setState({ imgUrl: event.target.value });
              }}
            />
          </label>
        </p>
        <p>
          <label>
            {'imdbUrl: '}
            <input
              type="text"
              value={imdbUrl}
              onChange={(event) => {
                this.setState({ imdbUrl: event.target.value });
              }}
            />
          </label>
        </p>
        <p>
          <label>
            {'imdbId: '}
            <input
              type="text"
              value={imdbId}
              onChange={(event) => {
                this.setState({ imdbId: event.target.value });
              }}
            />
          </label>
        </p>
        <button type="submit">Add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
