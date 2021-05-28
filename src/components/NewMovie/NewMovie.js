import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const newMovie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };

    this.props.onAddMovie(newMovie);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    return (
      <form
        className="addNewMovieForm"
        onSubmit={this.handleFormSubmit}
      >
        <input
          className="formImgUrl formDefaultInput"
          placeholder="Poster image url"
          value={this.state.imgUrl}
          onChange={(event) => {
            this.setState({
              imgUrl: event.target.value,
            });
          }}
        />
        <input
          className="formImdbUrl formDefaultInput"
          placeholder="IMDb url"
          value={this.state.imdbUrl}
          onChange={(event) => {
            this.setState({
              imdbUrl: event.target.value,
            });
          }}
        />
        <input
          className="formImdbId formDefaultInput"
          placeholder="IMDb id"
          value={this.state.imdbId}
          onChange={(event) => {
            this.setState({
              imdbId: event.target.value,
            });
          }}
        />
        <input
          className="formTitle formDefaultInput"
          placeholder="Enter title"
          value={this.state.title}
          onChange={(event) => {
            this.setState({
              title: event.target.value,
            });
          }}
        />
        <input
          className="formDescription"
          placeholder="Enter description"
          value={this.state.description}
          onChange={(event) => {
            this.setState({
              description: event.target.value,
            });
          }}
        />
        <button type="submit">Add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAddMovie: PropTypes.func.isRequired,
};
