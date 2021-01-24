import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        [name]: value,
      },
    }));
  };

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state.newMovie;
    const { onAdd } = this.props;

    return (
      <form
        className="page__creater"
        action="#"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
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
        }}
      >
        <label className="page__item">
          {' '}
          <span className="page__item--title">Title:</span>
          <input
            className="page__item--input"
            type="text"
            name="title"
            placeholder="tape a title"
            value={title}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label className="page__item">
          {' '}
          Description:
          <input
            className="page__item--input"
            type="text"
            name="description"
            placeholder="tape a description"
            value={description}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label className="page__item">
          {' '}
          imgUrl:
          <input
            className="page__item--input"
            type="text"
            name="imgUrl"
            placeholder="tape a imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label className="page__item">
          {' '}
          imdbUrl:
          <input
            className="page__item--input"
            type="text"
            name="imdbUrl"
            placeholder="tape a imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label className="page__item">
          {' '}
          imdbId:
          <input
            className="page__item--input"
            type="text"
            name="imdbId"
            placeholder="tape a imdbId"
            value={imdbId}
            onChange={this.handleChange}
          />
        </label>
        <br />

        <button
          type="submit"
          className="page__button"
        >
          Add movie
        </button>

      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
