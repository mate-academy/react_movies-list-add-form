import React from 'react';
import PropTypes from 'prop-types';

import './NewMovie.scss';

export class NewMovie extends React.Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  hendleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  createMovie = (event) => {
    const { addMovie } = this.props;

    event.preventDefault();
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
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <div>
        <h2 className="heading">Add new Movie</h2>
        <form
          className="form"
          onSubmit={this.createMovie}
        >
          <label className="form__lable">
            Title:
            <input
              name="title"
              className="form__input"
              placeholder="Title"
              type="text"
              value={title}
              onChange={this.hendleChange}
            />
          </label>
          <label className="form__lable">
            Description:
            <input
              name="description"
              className="form__input"
              placeholder="Description"
              type="text"
              value={description}
              onChange={this.hendleChange}
            />
          </label>
          <label className="form__lable">
            Image adress:
            <input
              name="imgUrl"
              className="form__input"
              placeholder="image URL"
              type="text"
              value={imgUrl}
              onChange={this.hendleChange}
            />
          </label>
          <label className="form__lable">
            <input
              name="imdbUrl"
              className="form__input"
              placeholder="imdbUrl"
              type="text"
              value={imdbUrl}
              onChange={this.hendleChange}
            />
          </label>
          <label className="form__lable">
            <input
              name="imdbId"
              className="form__input"
              placeholder="imdbId"
              type="text"
              value={imdbId}
              onChange={this.hendleChange}
            />
          </label>
          <button
            className="form__button"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
