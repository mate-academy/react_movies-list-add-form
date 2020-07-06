import React, { Component } from 'react';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imdbId: '',
    imdbUrl: '',
    imgUrl: '',
  };

  getTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  getDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  }

  getPoster = (event) => {
    this.setState({
      imgUrl: event.target.value,
    });
  }

  getImdbUrl = (event) => {
    this.setState({
      imdbUrl: event.target.value,
    });
  }

  getImdbId = (event) => {
    this.setState({
      imdbId: event.target.value,
    });
  }

  render() {
    console.log("NewMovie -> render -> this", this)
    const { title, description, imdbId, getImdbUrl, imgUrl } = this.state;

    return (
      <form
        className="addMovieForm"
        onSubmit={event => (
          this.props.addMovie(
            event,
            title,
            description,
            imdbId,
            getImdbUrl,
            imgUrl,
          )
        )}
      >
        <input
          type="text"
          value={this.state.title}
          onChange={this.getTitle}
          placeholder="Enter a movie title"
          className="addMovieForm__element"
          required
        />

        <textarea
          type="text"
          value={this.state.description}
          onChange={this.getDescription}
          placeholder="Enter a movie description"
          className="addMovieForm__element"
          rows="5"
          required
        />

        <input
          type="text"
          value={this.state.imgUrl}
          onChange={this.getPoster}
          placeholder="Enter a movie poster URL"
          className="addMovieForm__element"
          required
          pattern="(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)"
        />

        <input
          type="text"
          value={this.state.imdbUrl}
          onChange={this.getImdbUrl}
          placeholder="Enter a movie IMDB URL"
          className="addMovieForm__element"
          required
          pattern="(https:\/\/|http:\/\/)?(www.imdb.com\/title\/(.{2})\w{7})$"
        />

        <input
          type="text"
          value={this.state.imdbId}
          onChange={this.getImdbId}
          placeholder="Enter a movie IMDB id"
          className="addMovieForm__element"
          required
          pattern="(.{2})\w{7}$"
        />

        <button type="submit">
          Enter
        </button>
      </form>
    );
  }
}
