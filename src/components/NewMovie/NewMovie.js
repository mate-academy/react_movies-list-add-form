import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    error: {
      titleError: false,
      descriptionError: false,
      imgUrlError: false,
      imdbUrlError: false,
      imdbId: false,
    },
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(state => ({
      [name]: value,
      error: {
        ...state.error,
        [`${name}Error`]: !value,
      },
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { onAdd } = this.props;
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    this.setState({
      error: {
        titleError: !title,
        descriptionError: !description,
        imgUrlError: !imgUrl,
        imdbUrlError: !imdbUrl,
        imdbIdError: !imdbId,
      },
    });

    if (!title || !description || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

    onAdd(this.state);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      error,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          className={
            classNames('form-control',
              { 'form-input-error': error.titleError })
          }
          placeholder="Film title"
          value={title}
          onChange={this.handleChange}
        />
        <div className={
          classNames('form-span',
            { 'form-error': error.titleError })
        }
        >
          Please enter title
        </div>
        <textarea
          type="text"
          name="description"
          className={
            classNames('form-control',
              { 'form-input-error': error.descriptionError })
          }
          placeholder="Film description"
          value={description}
          onChange={this.handleChange}
        />
        <div className={
          classNames('form-span',
            { 'form-error': error.descriptionError })
        }
        >
          Please enter description
        </div>
        <input
          type="text"
          name="imgUrl"
          className={
            classNames('form-control',
              { 'form-input-error': error.imgUrlError })
          }
          placeholder="Film imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
        />
        <div className={
          classNames('form-span',
            { 'form-error': error.imgUrlError })
        }
        >
          Please enter imgUrl
        </div>
        <input
          type="text"
          name="imdbUrl"
          className={
            classNames('form-control',
              { 'form-input-error': error.imdbUrlError })
          }
          placeholder="Film imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
        />
        <div className={
          classNames('form-span',
            { 'form-error': error.imdbUrlError })
        }
        >
          Please enter imdbUrl
        </div>
        <input
          type="text"
          name="imdbId"
          className={
            classNames('form-control',
              { 'form-input-error': error.imdbIdError })
          }
          placeholder="Film imdbId"
          value={imdbId}
          onChange={this.handleChange}
        />
        <div className={
          classNames('form-span',
            { 'form-error': error.imdbIdError })
        }
        >
          Please enter imdbId
        </div>
        <button
          className="form-btn"
          type="submit"
        >
          Add Film
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
