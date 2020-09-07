import React, { Component } from 'react';
import propTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  isSubmit = (event) => {
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
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form className="form" onSubmit={this.isSubmit}>
        <input
          type="text"
          className="form__input"
          name="title"
          placeholder="Pleas enter title"
          required
          value={title}
          onChange={event => this.setState({
            title: event.target.value,
          })}
        />
        <textarea
          name="description"
          className="form__textarea"
          placeholder="Pleas enter description"
          required
          value={description}
          onChange={event => this.setState({
            description: event.target.value,
          })}
        />
        <input
          type="url"
          className="form__input"
          name="imgUrl"
          placeholder="Pleas enter image url"
          required
          value={imgUrl}
          onChange={event => this.setState({
            imgUrl: event.target.value,
          })}
        />
        <input
          type="url"
          className="form__input"
          name="imdbUrl"
          placeholder="Pleas enter imdb url"
          required
          value={imdbUrl}
          onChange={event => this.setState({
            imdbUrl: event.target.value,
          })}
        />
        <input
          type="text"
          className="form__input"
          name="imdbId"
          placeholder="Pleas enter imdb ID"
          required
          value={imdbId}
          onChange={event => this.setState({
            imdbId: event.target.value,
          })}
        />
        <button type="submit" className="form__button">Add</button>
      </form>

    );
  }
}

NewMovie.propTypes = {
  addMovie: propTypes.func.isRequired,
};
