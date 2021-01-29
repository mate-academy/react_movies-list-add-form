import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    inputTitle: false,
    inputImdbId: false,
  };

  validateInput = (e) => {
    const { name } = e.target;

    if (e.target.value.length < 3) {
      this.setState({
        [name]: true,
      });
    } else {
      this.setState({
        [name]: false,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAdd(movie);
    this.clearForm();
  }

  handleChange = (e) => {
    const { change } = e.target.dataset;

    this.setState({
      [change]: e.target.value,
    });
  }

  clearForm() {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId,
      inputTitle, inputImdbId } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <label className="form__label">
          <input
            type="text"
            placeholder="Title"
            name="inputTitle"
            value={title}
            data-change="title"
            className={classNames('form__input', {
              'form__input--error': inputTitle,
            })}
            onChange={this.handleChange}
            onBlur={this.validateInput}
          />
          {inputTitle
          && <p className="form__error">Please, enter the title</p>}
        </label>

        <label className="form__label">
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={description}
            data-change="description"
            className="form__input"
            onChange={this.handleChange}
          />
        </label>

        <label className="form__label">
          <input
            type="text"
            placeholder="image url"
            name="inputImgUrl"
            value={imgUrl}
            data-change="imgUrl"
            className="form__input"
            onChange={this.handleChange}
            onBlur={this.validateInput}
          />
        </label>

        <label className="form__label">
          <input
            type="text"
            placeholder="IMDB url"
            value={imdbUrl}
            data-change="imdbUrl"
            name="inputImdbUrl"
            className="form__input"
            onChange={this.handleChange}
            onBlur={this.validateInput}
          />
        </label>

        <label className="form__label">
          <input
            type="text"
            placeholder="IMDB id"
            value={imdbId}
            data-change="imdbId"
            name="inputImdbId"
            className={classNames('form__input', {
              'form__input--error': inputImdbId,
            })}
            onChange={this.handleChange}
            onBlur={this.validateInput}
          />
          {inputImdbId
            && <p className="form__error">Please, enter the IMBD id</p>}
        </label>

        <button
          className="form__button"
          type="submit"
        >
          Add new movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
