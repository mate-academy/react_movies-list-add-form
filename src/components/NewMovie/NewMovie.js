import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

// eslint-disable-next-line max-len
const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    imgUrlValidation: true,
    imdbUrlValidation: true,
  };

  checkValidationImgUrl = () => {
    this.setState(state => ({
      imgUrlValidation: regex.test(state.imgUrl),
    }));
  }

  checkValidationImdbUrl = () => {
    this.setState(state => ({
      imdbUrlValidation: regex.test(state.imdbUrl),
    }));
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      imgUrlValidation,
      imdbUrlValidation,
    } = this.state;

    return (
      <>
        <h2 className="form__title">Add movie</h2>
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            this.props.addMovie({
              title,
              description,
              imgUrl,
              imdbUrl,
              imdbId,
            });

            this.setState({
              title: '',
              description: '',
              imgUrl: '',
              imdbUrl: '',
              imdbId: '',
              imgUrlValidation: true,
              imdbUrlValidation: true,
            });
          }}
        >
          <div className="form__input-wrapper">
            <input
              className="form__input"
              type="text"
              placeholder="Movie title"
              value={title}
              required
              onChange={event => (
                this.setState({
                  title: event.target.value,
                })
              )}
            />
          </div>

          <div className="form__input-wrapper">
            <input
              className="form__input"
              type="text"
              placeholder="Description of the film"
              value={description}
              required
              onChange={event => (
                this.setState({
                  description: event.target.value,
                })
              )}
            />
          </div>

          <div className="form__input-wrapper">
            <input
              type="text"
              placeholder="Enter the image URL"
              value={imgUrl}
              required
              onChange={(event) => {
                this.setState({
                  imgUrl: event.target.value,
                });
                this.checkValidationImgUrl();
              }}
              className={
                imgUrlValidation
                  ? 'form__input'
                  : 'form__input--invalid'
              }
            />
            {
              imgUrlValidation
                ? null
                : (
                  <span className="form__invalid-text">
                    Image URL entered incorrectly
                  </span>
                )
            }
          </div>

          <div className="form__input-wrapper">
            <input
              type="text"
              placeholder="Enter the imdbUrl"
              value={imdbUrl}
              required
              onChange={(event) => {
                this.setState({
                  imdbUrl: event.target.value,
                });
                this.checkValidationImdbUrl();
              }}
              className={
                imdbUrlValidation ? 'form__input' : 'form__input--invalid'
              }
            />
            {
              imdbUrlValidation
                ? null
                : (
                  <span className="form__invalid-text">
                    Image URL entered incorrectly
                  </span>
                )
            }
          </div>

          <div className="form__input-wrapper">
            <input
              className="form__input"
              type="text"
              placeholder="Enter the imdbId"
              value={imdbId}
              required
              onChange={event => (
                this.setState({
                  imdbId: event.target.value,
                })
              )}
            />
          </div>

          <button
            disabled={!imgUrlValidation || !imdbUrlValidation}
            type="submit"
            className="form__button"
          >
            add movie
          </button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
