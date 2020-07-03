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
    error: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  onChangeInput = (target) => {
    const { name, value } = target;

    this.setState(prevState => ({
      [name]: value.replace(/^\s/, '').replace(/\s/g, ' '),
      error: {
        ...prevState.error,
        [name]: false,
      },
    }));
  }

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
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (title && description && (imgUrl && pattern.test(imgUrl))
        && (imdbUrl && pattern.test(imdbUrl))
        && Number(imdbId)) {
      // Add new movie
      this.props.addMovie(this.state);

      // Reset form inputs
      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    }

    // If errors
    const errorObj = {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    };

    if (!title) {
      errorObj.title = true;
    }

    if (!description) {
      errorObj.description = true;
    }

    if (!imgUrl || !pattern.test(imgUrl)) {
      errorObj.imgUrl = true;
    }

    if (!imdbUrl || !pattern.test(imdbUrl)) {
      errorObj.imdbUrl = true;
    }

    if (!imdbId || !Number(imdbId)) {
      errorObj.imdbId = true;
    }

    this.setState({
      error: {
        title: errorObj.title,
        description: errorObj.description,
        imgUrl: errorObj.imgUrl,
        imdbUrl: errorObj.imdbUrl,
        imdbId: errorObj.imdbId,
      },
    });
  }

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
      <form className="form" onSubmit={e => this.handleSubmit(e)}>
        <input
          type="text"
          name="title"
          className={`form__input ${error.title && 'form__input--error'}`}
          placeholder="Add movie title"
          maxLength="100"
          onChange={e => this.onChangeInput(e.target)}
          value={title}
        />
        {
          error.title && (
            <div className="form__error">
              Please add movie title
            </div>
          )
        }
        <input
          type="text"
          name="description"
          className={`form__input ${error.description && `form__input--error`}`}
          placeholder="Add movie description"
          maxLength="100"
          onChange={e => this.onChangeInput(e.target)}
          value={description}
        />
        {
          error.description && (
            <div className="form__error">
              Please add movie description
            </div>
          )
        }
        <input
          type="text"
          name="imgUrl"
          className={`form__input ${error.imgUrl && `form__input--error`}`}
          placeholder="Add url for image"
          maxLength="100"
          onChange={e => this.onChangeInput(e.target)}
          value={imgUrl}
        />
        {
          error.imgUrl && (
            <div className="form__error">
              Please add correct url
            </div>
          )
        }
        <input
          type="text"
          name="imdbUrl"
          className={`form__input ${error.imdbUrl && `form__input--error`}`}
          placeholder="Add url for link to imdb"
          maxLength="100"
          onChange={e => this.onChangeInput(e.target)}
          value={imdbUrl}
        />
        {
          error.imdbUrl && (
            <div className="form__error">
              Please add correct url
            </div>
          )
        }
        <input
          type="text"
          name="imdbId"
          className={`form__input ${error.imdbId && `form__input--error`}`}
          placeholder="Add Id for imdb"
          maxLength="100"
          onChange={e => this.onChangeInput(e.target)}
          value={imdbId}
        />
        {
          error.imdbId && (
            <div className="form__error">
              Please add numbers value
            </div>
          )
        }
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
