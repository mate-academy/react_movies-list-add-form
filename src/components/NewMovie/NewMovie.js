import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    movie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbld: '',
    },
    error: {
      title: false,
      description: false,
      imgUrl: false,
      imdbUrl: false,
      imdbld: false,
    },
  };

  onChangeMovie = (event) => {
    const { name, value } = event.target;
    const propValue = (value.trim().length === 0);

    return this.setState(prevState => ({
      movie: {
        ...prevState.movie,
        [name]: value,
      },
      error: {
        ...prevState.error,
        [name]: propValue,
      },
    }));
  };

  resetState = () => {
    return this.setState(prevState => ({
      movie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbld: '',
      },
      error: {
        title: false,
        description: false,
        imgUrl: false,
        imdbUrl: false,
        imdbld: false,
      },
    }));
  };

  submitHandler = (event) => {
    event.preventDefault();

    if (this.state.movie.imdbld
      && this.state.movie.imdbUrl
      && this.state.movie.imgUrl
      && this.state.movie.description
      && this.state.movie.title
    ) {
      this.props.addMovie(this.state.movie);

      this.resetState();
    }
  };

  render() {
    return (
      <form className="film__form" onSubmit={this.submitHandler}>
        <label htmlFor="">
          Title
          <input
            type="text"
            className="film__input"
            value={this.state.movie.title}
            name="title"
            onChange={this.onChangeMovie}
            placeholder="Enter title"
          />
        </label>
        {this.state.error.title && (
          <div className="film__error">Please, enter title text</div>
        )}
        <label htmlFor="">
          Description
          <input
            type="text"
            className="film__input"
            value={this.state.movie.description}
            name="description"
            onChange={this.onChangeMovie}
            placeholder="Enter description"
          />
        </label>
        {this.state.error.description && (
          <div className="film__error">Please, enter description text</div>
        )}
        <label htmlFor="">
          ImgUrl
          <input
            type="text"
            className="film__input"
            value={this.state.movie.imgUrl}
            name="imgUrl"
            onChange={this.onChangeMovie}
            placeholder="Enter imgUrl"
          />
        </label>
        {this.state.error.imgUrl && (
          <div className="film__error">Please, enter imgUrl text</div>
        )}
        <label htmlFor="">
          ImdbUrl
          <input
            type="text"
            className="film__input"
            value={this.state.movie.imdbUrl}
            name="imdbUrl"
            onChange={this.onChangeMovie}
            placeholder="Enter imdbUrl"
          />
        </label>
        {this.state.error.imdbUrl && (
          <div className="film__error">Please, enter imdUrl text</div>
        )}
        <label htmlFor="">
          imdbld
          <input
            type="text"
            className="film__input"
            value={this.state.movie.imdbld}
            name="imdbld"
            onChange={this.onChangeMovie}
            placeholder="Enter imdbld"
          />
        </label>
        {this.state.error.imdbld && (
          <div className="film__error">Please, enter imdbld title text</div>
        )}
        <button type="submit">Save card</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
