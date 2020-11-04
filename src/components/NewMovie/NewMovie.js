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
    submitDisabled: true,
  };

  onInputChange = (event) => {
    const { value, name } = event.target;

    this.setState(state => ({
      [name]: value,
      submitDisabled: !(
        state.title !== '' && state.imgUrl !== '' && state.imdbUrl !== ''
        && state.imdbId !== ''
      ),
    }));
  }

  clearForm() {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      submitDisabled: true,
    });
  }

  render() {
    const { onAdd } = this.props;
    const {
      title, description, imgUrl, imdbUrl, imdbId, submitDisabled,
    } = this.state;

    return (
      <form
        name="newMovie"
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          onAdd(title, description, imgUrl, imdbUrl, imdbId);
          this.clearForm();
        }}
      >
        <label className="form__label" htmlFor="title">Movie title:</label>
        <input
          className="form__input"
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={this.onInputChange}
        />
        <label className="form__label" htmlFor="description">
          Movie description:
        </label>
        <input
          className="form__input"
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={this.onInputChange}
        />
        <label className="form__label" htmlFor="imgUrl">Image Url:</label>
        <input
          className="form__input"
          type="text"
          name="imgUrl"
          id="imgUrl"
          value={imgUrl}
          onChange={this.onInputChange}
        />
        <label className="form__label" htmlFor="imdbUrl">IMDB Url:</label>
        <input
          className="form__input"
          type="text"
          name="imdbUrl"
          id="imdbUrl"
          value={imdbUrl}
          onChange={this.onInputChange}
        />
        <label className="form__label" htmlFor="imdbId">IMDB Id:</label>
        <input
          className="form__input"
          type="text"
          name="imdbId"
          id="imdbId"
          value={imdbId}
          onChange={this.onInputChange}
        />
        <button
          type="submit"
          className="form__button"
          disabled={submitDisabled}
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
