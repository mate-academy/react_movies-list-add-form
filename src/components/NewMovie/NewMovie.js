import React, { Component } from 'react';
import { addMovieShape } from '../../Shapes';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  onChangeInput = (target) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.addMovie(this.state);

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
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form className="form" onSubmit={e => this.handleSubmit(e)}>
        <input
          required
          type="text"
          name="title"
          className="form__input"
          placeholder="Add movie title"
          maxLength="100"
          onChange={e => this.onChangeInput(e.target)}
          value={title}
        />
        <input
          required
          type="text"
          name="description"
          className="form__input"
          placeholder="Add movie description"
          maxLength="100"
          onChange={e => this.onChangeInput(e.target)}
          value={description}
        />
        <input
          required
          type="text"
          name="imgUrl"
          className="form__input"
          placeholder="Add url for image"
          maxLength="100"
          onChange={e => this.onChangeInput(e.target)}
          value={imgUrl}
        />
        <input
          required
          type="text"
          name="imdbUrl"
          className="form__input"
          placeholder="Add url for link to imdb"
          maxLength="100"
          onChange={e => this.onChangeInput(e.target)}
          value={imdbUrl}
        />
        <input
          required
          type="text"
          name="imdbId"
          className="form__input"
          placeholder="Add Id for imdb"
          maxLength="100"
          onChange={e => this.onChangeInput(e.target)}
          value={imdbId}
        />
        <button
          type="submit"
          className="form__button"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = addMovieShape.isRequired;
