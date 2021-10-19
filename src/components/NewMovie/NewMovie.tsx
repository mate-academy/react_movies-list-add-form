import React, { Component } from 'react';
import './NewMovie.scss';
import classnames from 'classnames';

type Props = {
  onAdd: (movie: Movie) => void,
};
type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  errors: {
    title: boolean,
    description: boolean,
    imgUrl: boolean,
    imdbUrl: boolean,
    imdbId: boolean,
  },
};
type InputEvents = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;

const IMAGE_URL = 'https://via.placeholder.com/600x1000';
const IMDB_URL = 'https://www.imdb.com/';

const defaultState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
  errors: {
    title: false,
    description: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  },
};

export class NewMovie extends Component<Props, State> {
  state: State = defaultState;

  handleInputChange = (event: InputEvents) => {
    const { name, value } = event.target;

    this.setState(state => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  setSpecialValue = (field: string, value: string) => {
    this.setState(state => ({
      ...state,
      [field]: value,
      errors: {
        ...state.errors,
        [field]: false,
      },
    }));
  };

  validateTextInput = (event: InputEvents) => {
    const { name, value } = event.target;
    const valueWithoutSpaces = value.replace(/\s/g, '');

    this.setState(state => {
      return {
        ...state,
        errors: {
          ...state.errors,
          [name]: valueWithoutSpaces === '',
        },
      };
    });
  };

  validateLink = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const valueIsNotLink = !value.match(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

    this.setState(state => {
      return {
        ...state,
        errors: {
          ...state.errors,
          [name]: valueIsNotLink,
        },
      };
    });
  };

  isFormComplete = () => {
    const fields = Object.values(this.state).filter(value => typeof value === 'string');
    const hasEmptyFields = fields.some(field => field === '');
    const hasErrors = Object.values(this.state.errors).some(error => error);

    return hasEmptyFields || hasErrors;
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      errors,
    } = this.state;

    return (
      <form className="form">
        <label
          htmlFor="title-input"
          className="form__input"
        >
          <span className="form__label-text">
            Title
          </span>
          <input
            id="title-input"
            type="text"
            name="title"
            className={classnames(
              'form__input-field',
              { 'form__input-field--invalid': errors.title },
            )}
            onChange={this.handleInputChange}
            value={title}
            onBlur={this.validateTextInput}
          />
          <br />
          {errors.title && 'Required field'}
        </label>

        <label
          htmlFor="description-input"
          className="form__input"
        >
          <span className="form__label-text">
            Description
          </span>
          <textarea
            id="description-input"
            name="description"
            className={classnames(
              'form__input-field',
              { 'form__input-field--invalid': errors.description },
            )}
            value={description}
            onChange={this.handleInputChange}
            onBlur={this.validateTextInput}
          />
          <br />
          {errors.description && 'Required field'}
        </label>

        <label
          htmlFor="img-url-input"
          className="form__input"
        >
          <span className="form__label-text">
            Image URL
          </span>
          <button
            type="button"
            onClick={() => {
              this.setSpecialValue('imgUrl', IMAGE_URL);
            }}
          >
            Use Placeholder
          </button>
          <input
            id="img-url-input"
            type="text"
            name="imgUrl"
            className={classnames(
              'form__input-field',
              { 'form__input-field--invalid': errors.imgUrl },
            )}
            value={imgUrl}
            onChange={this.handleInputChange}
            onBlur={this.validateLink}
          />
          <br />
          {errors.imgUrl && 'Must be a link'}
        </label>

        <label
          htmlFor="imdb-url-input"
          className="form__input"
        >
          <span className="form__label-text">
            IMDB URL
          </span>
          <button
            type="button"
            onClick={() => {
              this.setSpecialValue('imdbUrl', IMDB_URL);
            }}
          >
            Default IMDB link
          </button>
          <input
            id="imdb-url-input"
            type="text"
            name="imdbUrl"
            className={classnames(
              'form__input-field',
              { 'form__input-field--invalid': errors.imdbUrl },
            )}
            value={imdbUrl}
            onChange={this.handleInputChange}
            onBlur={this.validateLink}
          />
          <br />
          {errors.imdbUrl && 'Must be a link'}
        </label>

        <label
          htmlFor="imdb-id-input"
          className="form__input"
        >
          <span className="form__label-text">
            IMDB ID
          </span>
          <input
            id="imdb-id-input"
            type="text"
            name="imdbId"
            className={classnames(
              'form__input-field',
              { 'form__input-field--invalid': errors.imdbId },
            )}
            value={imdbId}
            onChange={this.handleInputChange}
            onBlur={this.validateTextInput}
          />
          <br />
          {errors.imdbId && 'Required field'}
        </label>

        <button
          type="button"
          onClick={() => {
            this.props.onAdd({
              title,
              description,
              imgUrl,
              imdbUrl,
              imdbId,
            });
            this.setState(defaultState);
          }}
          disabled={this.isFormComplete()}
        >
          ADD
        </button>
      </form>
    );
  }
}
