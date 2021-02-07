import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    submitDisabled: true,
  };

  onInputChange = (value, id) => {
    this.setState(state => ({
      [id]: value,
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
        className="field"
        onSubmit={(event) => {
          event.preventDefault();
          onAdd(title, description, imgUrl, imdbUrl, imdbId);
          this.clearForm();
        }}
      >
        <label htmlFor="title">Movie title </label>
        <div className="control">
          <input
            className="input"
            type="text"
            id="title"
            value={title}
            onChange={
              event => this.onInputChange(event.target.value, event.target.id)
            }
          />
        </div>
        <label htmlFor="description">Movie description </label>
        <div className="control">
          <textarea
            className="textarea"
            type="text"
            id="description"
            value={description}
            onChange={
              event => this.onInputChange(event.target.value, event.target.id)
            }
          />
        </div>
        <label htmlFor="imgUrl">Image Url </label>
        <div className="control">
          <input
            className="input"
            type="text"
            id="imgUrl"
            value={imgUrl}
            onChange={
              event => this.onInputChange(event.target.value, event.target.id)
            }
          />
        </div>
        <label htmlFor="imdbUrl">IMDB Url </label>
        <div className="control">
          <input
            className="input"
            type="text"
            id="imdbUrl"
            value={imdbUrl}
            onChange={
              event => this.onInputChange(event.target.value, event.target.id)
            }
          />
        </div>
        <label htmlFor="imdbId">IMDB Id </label>
        <div className="control">
          <input
            className="input"
            type="text"
            id="imdbId"
            value={imdbId}
            onChange={
              event => this.onInputChange(event.target.value, event.target.id)
            }
          />
        </div>
        <button
          type="submit"
          className="button is-dark is-fullwidth"
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
