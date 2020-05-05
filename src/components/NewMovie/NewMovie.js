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
      title: true,
      imgUrl: true,
      imdbUrl: true,
      imdbId: true,
      isValidImgUrl: true,
      isValidImdbUrl: true,
    },
    sumbmitDisabled: true,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    const { validation } = this.state;
    const arrayOfValidations = [...Object.values(validation)];

    this.setState(state => ({ newMovie: {
      ...state.newMovie,
      [name]: value,
    } }));

    if (!arrayOfValidations.some(valid => !valid)) {
      this.setState({ sumbmitDisabled: false });
    }
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
      }
    }
  }

  render() {
    const { addMovie } = this.props;
    const { newMovie, validation, sumbmitDisabled } = this.state;

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
            sumbmitDisabled: true,
          });
        }}
      >
        <span>title</span>
        <input
          className={validation.title
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
          hidden={validation.title}
        >
          field must not be empty
        </p>
        <span>description</span>
        <input
          className="form__input"
          value={newMovie.description}
          onChange={this.handleChange}
          name="description"
        />
        <span>imgUrl</span>
        <input
          className={validation.imgUrl
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
          hidden={validation.imgUrl}
        >
          {validation.isValidImgUrl
            ? 'field must not be empty'
            : 'invalid url'
          }
        </p>
        <span>imdbUrl</span>
        <input
          className={validation.imdbUrl
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
          hidden={validation.imdbUrl}
        >
          {validation.isValidImdbUrl
            ? 'field must not be empty'
            : 'invalid url'
          }
        </p>
        <span>imdbId</span>
        <input
          className={validation.imdbId
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
          hidden={validation.imdbId}
        >
          field must not be empty
        </p>
        <button disabled={sumbmitDisabled} className="form__btn" type="submit">
          add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
