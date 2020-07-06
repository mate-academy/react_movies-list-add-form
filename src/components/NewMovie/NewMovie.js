import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imdbId: '',
    imdbUrl: '',
    imgUrl: '',
  };

  getMovieData = (event, prop) => {
    this.setState({
      [prop]: event.target.value,
    });
  }

  submit = (event) => {
    const { title, description, imdbId, imdbUrl, imgUrl } = this.state;

    this.setState({
      title: '',
      description: '',
      imdbId: '',
      imdbUrl: '',
      imgUrl: '',
    });

    return (
      this.props.addMovie(
        event,
        title,
        description,
        imdbId,
        imdbUrl,
        imgUrl,
      )
    );
  }

  render() {
    return (
      <form
        className="addMovieForm"
        onSubmit={this.submit}
      >
        <input
          type="text"
          value={this.state.title}
          onChange={event => this.getMovieData(event, 'title')}
          placeholder="Enter a movie title"
          className="addMovieForm__element"
          required
        />

        <textarea
          type="text"
          value={this.state.description}
          onChange={event => this.getMovieData(event, 'description')}
          placeholder="Enter a movie description"
          className="addMovieForm__element"
          rows="5"
          required
        />

        <input
          type="text"
          value={this.state.imgUrl}
          onChange={event => this.getMovieData(event, 'imgUrl')}
          placeholder="Enter a movie poster URL"
          className="addMovieForm__element"
          required
          pattern="(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)"
        />

        <input
          type="text"
          value={this.state.imdbUrl}
          onChange={event => this.getMovieData(event, 'imdbUrl')}
          placeholder="Enter a movie IMDB URL"
          className="addMovieForm__element"
          required
          pattern="(https:\/\/)?(www.imdb.com\/title\/(.{2})\w{7})(\/)?$"
        />

        <input
          type="text"
          value={this.state.imdbId}
          onChange={event => this.getMovieData(event, 'imdbId')}
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

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
