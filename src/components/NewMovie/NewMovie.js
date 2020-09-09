import React from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends React.Component {
  state = {
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { onAdd } = this.props;

    onAdd(this.state.newMovie);

    this.setState({
      newMovie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        [name]: value.trimLeft(),
      },
    }));
  }

  render() {
    const { newMovie } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="addFilm">
        <h2 className="addFilm__title">
          Add film
        </h2>

        <input
          name="title"
          type="text"
          className="addFilm__input"
          value={newMovie.title}
          onChange={this.handleChange}
          placeholder="Movie title"
          required
        />
        <textarea
          name="description"
          className="addFilm__input addFilm__description"
          value={newMovie.description}
          onChange={this.handleChange}
          placeholder="Movie description"
          required
        />
        <input
          name="imgUrl"
          type="text"
          className="addFilm__input"
          value={newMovie.imgUrl}
          onChange={this.handleChange}
          placeholder="Movie imgUrl"
          required
        />

        <input
          name="imdbUrl"
          type="text"
          className="addFilm__input"
          value={newMovie.imdbUrl}
          onChange={this.handleChange}
          placeholder="Movie imdbUrl"
          required
        />

        <input
          name="imdbId"
          type="text"
          className="addFilm__input"
          value={newMovie.imdbId}
          onChange={this.handleChange}
          placeholder="Movie imdbId"
          required
        />

        <button
          type="submit"
          className="addFilm__button"
        >
          Add film
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
