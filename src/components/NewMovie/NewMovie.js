import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './NewMovie.scss';

export class NewMovie extends React.Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',

    errors: {
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  inputChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  inputValidation = (event) => {
    const { errors } = this.state;
    const { name, value, type } = event.target;
    // eslint-disable-next-line
    const regExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (type === 'url') {
      this.setState({
        errors: {
          ...errors,
          [name]: regExp.test(value),
        },
      });

      return;
    }

    this.setState({
      errors: {
        ...errors,
        [name]: !!value,
      },
    });
  }

  formSubmit = (event) => {
    event.preventDefault();

    const { errors } = this.state;
    let mistakeCounter = 0;

    Object.entries(errors).forEach(([prop, value]) => {
      if (value !== true) {
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            [prop]: false,
          },
        }));

        mistakeCounter += 1;
      }
    });

    if (mistakeCounter > 0) {
      return;
    }

    this.props.onAdd({ ...this.state });
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      errors: {
        title: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
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
      errors: {
        title: titleError,
        imgUrl: imgUrlError,
        imdbUrl: imdbUrlError,
        imdbId: imdbIdError,
      },
    } = this.state;

    return (
      <form
        className="NewMovie__form"
        onSubmit={this.formSubmit}
      >
        <input
          className={classNames(
            'NewMovie__input',
            (titleError === true) && 'NewMovie__input--correct',
            (titleError === false) && 'NewMovie__input--incorrect',
          )}
          name="title"
          placeholder="Movie title"
          type="text"
          value={title}
          onChange={this.inputChange}
          onBlur={this.inputValidation}
        />

        <input
          className="NewMovie__input"
          name="description"
          placeholder="Description"
          type="text"
          value={description}
          onChange={this.inputChange}
          onBlur={this.inputValidation}
        />

        <input
          className={classNames(
            'NewMovie__input',
            (imgUrlError === true) && 'NewMovie__input--correct',
            (imgUrlError === false) && 'NewMovie__input--incorrect',
          )}
          name="imgUrl"
          placeholder="Image URL"
          type="url"
          value={imgUrl}
          onChange={this.inputChange}
          onBlur={this.inputValidation}
        />

        <input
          className={classNames(
            'NewMovie__input',
            (imdbUrlError === true) && 'NewMovie__input--correct',
            (imdbUrlError === false) && 'NewMovie__input--incorrect',
          )}
          name="imdbUrl"
          placeholder="IMDb URL"
          type="url"
          value={imdbUrl}
          onChange={this.inputChange}
          onBlur={this.inputValidation}
        />

        <input
          className={classNames(
            'NewMovie__input',
            (imdbIdError === true) && 'NewMovie__input--correct',
            (imdbIdError === false) && 'NewMovie__input--incorrect',
          )}
          name="imdbId"
          placeholder="IMDb ID"
          type="name"
          value={imdbId}
          onChange={this.inputChange}
          onBlur={this.inputValidation}
        />

        <button type="submit">
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
