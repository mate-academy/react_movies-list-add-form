import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewMovie.scss';

const initialState = {
  title: {
    value: '',
    flag: false,
    error: '',
  },
  description: {
    value: '',
    flag: false,
    error: '',
  },
  imgUrl: {
    value: '',
    flag: false,
    error: '',
  },
  imdbUrl: {
    value: '',
    flag: false,
    error: '',
  },
  imdbId: {
    value: '',
    flag: false,
    error: '',
  },
};

export class NewMovie extends Component {
  // eslint-disable-next-line max-len
  urlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  state = initialState;

  isValidForm = () => (
    Object.values(this.state).every(({ flag }) => flag === true)
  )

  handleIsValidInputOnBlur = ({ target }) => {
    const { name } = target;

    const { value } = this.state[name];
    const isNotOnlySpaces = (value === undefined)
      ? false
      : value.trim().length > 0;
    const pattern = this.urlPattern;
    let flag,
      error;

    if (name === 'imgUrl' || name === 'imdbUrl') {
      flag = pattern.test(value);
      error = flag ? '' : 'Not valid';
    } else {
      flag = isNotOnlySpaces;
      error = flag ? '' : 'Not valid';
    }

    return (
      this.setState({
        [name]: {
          value,
          flag,
          error,
        },
      })
    );
  }

  onSubmit = (event) => {
    event.preventDefault();
    const movie = {};

    Object.entries(this.state).forEach(([input, obj]) => (
      movie[input] = obj.value));
    this.props.addMovie(movie);
    this.setState({
      ...initialState,
    });
  }

  handleInputChange = ({ target: { name, value } }) => (
    this.setState({ [name]: { value } })
  );

  render() {
    const { onSubmit } = this;
    const titleValue = this.state.title.value;
    const descriptionValue = this.state.description.value;
    const imgUrlValue = this.state.imgUrl.value;
    const imdbUrlValue = this.state.imdbUrl.value;
    const imdbValue = this.state.imdbId.value;
    const isSubmitButtonDisable = !this.isValidForm();
    const onChange = this.handleInputChange;
    const onBlur = this.handleIsValidInputOnBlur;

    return (
      <form className="form" onSubmit={onSubmit}>
        <label className="form__item">
          Title
          <input
            onBlur={onBlur}
            onChange={onChange}
            value={titleValue}
            name="title"
            type="text"
            placeholder="Input title"
            className={this.state.title.error
              ? 'form__input_error'
              : 'form__input'
            }
          />
          {this.state.title.error && <span>{this.state.title.error}</span>}
        </label>
        <label className="form__item">
          Description
          <textarea
            onBlur={onBlur}
            onChange={onChange}
            value={descriptionValue}
            name="description"
            type="text"
            placeholder="Input film description"
            className={this.state.description.error
              ? 'form__input_error'
              : 'form__input'
            }
          />
          {this.state.description.error
            && <span>{this.state.description.error}</span>
          }
        </label>
        <label className="form__item">
          ImgUrl
          <input
            onBlur={onBlur}
            onChange={onChange}
            value={imgUrlValue}
            name="imgUrl"
            type="text"
            placeholder="Paste image Url"
            className={this.state.imgUrl.error
              ? 'form__input_error'
              : 'form__input'
            }
          />
          {this.state.imgUrl.error && <span>{this.state.imgUrl.error}</span>}
        </label>
        <label className="form__item">
          ImdbUrl
          <input
            onBlur={onBlur}
            onChange={onChange}
            value={imdbUrlValue}
            name="imdbUrl"
            type="text"
            placeholder="Paste IMDB Url"
            className={this.state.imdbUrl.error
              ? 'form__input_error'
              : 'form__input'
            }
          />
          {this.state.imdbUrl.error
            && <span>{this.state.imdbUrl.error}</span>
          }
        </label>
        <label className="form__item">
          Imdb
          <input
            onBlur={onBlur}
            onChange={onChange}
            value={imdbValue}
            name="imdbId"
            type="text"
            placeholder="Input imdbId"
            className={this.state.imdbId.error
              ? 'form__input_error'
              : 'form__input'
            }
          />
          {this.state.imdbId.error && <span>{this.state.imdbId.error}</span>}
        </label>
        <button
          className="form__button"
          type="submit"
          disabled={isSubmitButtonDisable}
        >
          Submit
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
