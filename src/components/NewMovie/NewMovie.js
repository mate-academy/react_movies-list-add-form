import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    newMovie: {
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      description: '',
    },
    validation: {
      title: null,
      imgUrl: null,
      imdbUrl: null,
      imdbId: null,
      isValidImgUrl: true,
      isValidImdbUrl: true,
      description: null,
    },
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(state => ({ newMovie: {
      ...state.newMovie,
      [name]: value.trimLeft(),
    } }));
  }

  handleBlur = (event) => {
    const { value, name } = event.target;
    // eslint-disable-next-line max-len
    const regexp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (!value) {
      this.setState(state => ({ validation: {
        ...state.validation,
        [name]: false,
      } }));
    } else if (name === 'imgUrl' || name === 'imdbUrl') {
      let validateTarget;

      if (name === 'imgUrl') {
        validateTarget = 'isValidImgUrl';
      } else {
        validateTarget = 'isValidImdbUrl';
      }

      if (!regexp.test(value)) {
        this.setState(state => ({ validation: {
          ...state.validation,
          [name]: false,
          [validateTarget]: false,
        } }));
      } else {
        this.setState(state => ({ validation: {
          ...state.validation,
          [name]: true,
          [validateTarget]: true,
        } }));
      }
    } else {
      this.setState(state => ({ validation: {
        ...state.validation,
        [name]: true,
      } }));
    }
  }

  render() {
    const { addMovie } = this.props;
    const { newMovie, validation } = this.state;
    const arrayOfValidations = [...Object.values(validation)];

    return (
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();

          addMovie(this.state.newMovie);
          this.setState({
            newMovie: {
              title: '',
              imgUrl: '',
              imdbUrl: '',
              imdbId: '',
              description: '',
            },
            validation: {
              title: null,
              imgUrl: null,
              imdbUrl: null,
              imdbId: null,
              isValidImgUrl: true,
              isValidImdbUrl: true,
              description: null,
            },
          });
        }}
      >
        <span>title</span>
        <input
          className={validation.title || validation.title === null
            ? 'form__input'
            : 'form__input form__input-with-errors'
          }
          value={newMovie.title}
          onChange={this.handleChange}
          name="title"
          onBlur={this.handleBlur}
          required
        />
        <p
          className="form__error-message"
          hidden={validation.title || validation.title === null}
        >
          field must not be empty
        </p>
        <span>description</span>
        <input
          className={validation.description || validation.description === null
            ? 'form__input'
            : 'form__input form__input-with-errors'
          }
          value={newMovie.description}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          name="description"
        />
        <p
          className="form__error-message"
          hidden={validation.description || validation.description === null}
        >
          field must not be empty
        </p>
        <span>imgUrl</span>
        <input
          className={validation.imgUrl || validation.imgUrl === null
            ? 'form__input'
            : 'form__input form__input-with-errors'
          }
          value={newMovie.imgUrl}
          onChange={this.handleChange}
          name="imgUrl"
          onBlur={this.handleBlur}
          required
        />
        <p
          className="form__error-message"
          hidden={validation.imgUrl || validation.imgUrl === null}
        >
          {validation.isValidImgUrl
            ? 'field must not be empty'
            : 'invalid url'
          }
        </p>
        <span>imdbUrl</span>
        <input
          className={validation.imdbUrl || validation.imdbUrl === null
            ? 'form__input'
            : 'form__input form__input-with-errors'
          }
          value={newMovie.imdbUrl}
          onChange={this.handleChange}
          name="imdbUrl"
          onBlur={this.handleBlur}
          required
        />
        <p
          className="form__error-message"
          hidden={validation.imdbUrl || validation.imdbUrl === null}
        >
          {validation.isValidImdbUrl
            ? 'field must not be empty'
            : 'invalid url'
          }
        </p>
        <span>imdbId</span>
        <input
          className={validation.imdbId || validation.imdbId === null
            ? 'form__input'
            : 'form__input form__input-with-errors'
          }
          value={newMovie.imdbId}
          onChange={this.handleChange}
          name="imdbId"
          onBlur={this.handleBlur}
          required
        />
        <p
          className="form__error-message"
          hidden={validation.imdbId || validation.imdbId === null}
        >
          field must not be empty
        </p>
        <button
          disabled={arrayOfValidations.some(valid => !valid)}
          className="form__btn"
          type="submit"
        >
          add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
