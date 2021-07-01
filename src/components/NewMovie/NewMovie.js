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
    titleError: '',
    imdbIdError: '',
    imgUrlError: '',
    imdbUrlError: '',
  };

  static = {
    propTypes: {
      onAdd: PropTypes.func.isRequired,
    },
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
      titleError: '',
      imdbIdError: '',
      imgUrlError: '',
      imdbUrlError: '',
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    // eslint-disable-next-line max-len
    const pattern = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

    switch (true) {
      case !title:
        this.setState({ titleError: 'Что-то здесь пустовато!' });

        return;

      case !pattern.test(imgUrl):
        this.setState({ imgUrlError: 'Invalid URL' });

        return;

      case !pattern.test(imdbUrl):
        this.setState({ imdbUrlError: 'Invalid URL' });

        return;

      case !imdbId:
        this.setState({ imdbIdError: 'Что-то здесь пустовато!' });

        return;

      default:
        break;
    }

    const newFilm = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAdd(newFilm);

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
      titleError,
      imdbIdError,
      imgUrlError,
      imdbUrlError,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className={`label${!titleError ? '' : ' error'}`}>
          Title:&nbsp;
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <span>{titleError}</span>

        <div className="label">
          Description:&nbsp;
          <textarea
            name="description"
            value={description}
            onChange={this.handleChange}
          />
        </div>

        <div className={`label${!imgUrlError ? '' : ' error'}`}>
          ImgUrl:&nbsp;
          <input
            type="text"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
          />
        </div>
        <span>{imgUrlError}</span>

        <div className={`label${!imdbUrlError ? '' : ' error'}`}>
          ImdbUrl:&nbsp;
          <input
            type="text"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
          />
        </div>
        <span>{imdbUrlError}</span>

        <div className={`label${!imdbIdError ? '' : ' error'}`}>
          ImdbId:&nbsp;
          <input
            type="text"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
          />
        </div>
        <span>{imdbIdError}</span>

        <button
          type="submit"
          className="add-button"
          disabled={
            !!titleError
            || !!imgUrlError
            || !!imdbUrlError
            || !!imdbIdError
          }
        >
          Add
        </button>
      </form>
    );
  }
}
