import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';
import { NewMovieField } from '../NewMovieField/NewMovieField';

export class NewMovie extends Component {
  initState = {
    movie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    fields: {
      title: {
        isTouched: false,
        isValid: true,
      },
      imgUrl: {
        isTouched: false,
        isValid: true,
      },
      imdbUrl: {
        isTouched: false,
        isValid: true,
      },
      imdbId: {
        isTouched: false,
        isValid: true,
      },
    },
    isButtonDisabled: true,
  }

  state = {
    ...this.initState,
  };

  setValue = (key, value) => {
    this.setState(prevState => ({
      movie: {
        ...prevState.movie,
        [key]: value,
      },
    }));

    const fields = Object.values(this.state.fields);
    const touchedQuantity = fields.filter(field => field.isTouched).length;

    if (this.state.fields[key].isTouched
      || touchedQuantity === fields.length - 1) {
      this.setValidation(key, value);
    }
  }

  setValidation = (key, value) => {
    // eslint-disable-next-line max-len
    const pattern = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

    const isValid = (key === 'title' || key === 'imdbId')
      ? Boolean(value)
      : pattern.test(value);

    this.setState(prevState => ({
      fields: {
        ...prevState.fields,
        [key]: {
          isTouched: true,
          isValid,
        },
      },
    }));

    this.#setButton();
  }

  #setButton = () => {
    this.setState(prevState => ({
      isButtonDisabled: !Object.values(prevState.fields)
        .every(field => field.isTouched && field.isValid),
    }));
  }

  #handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ ...this.initState });
    this.props.addMovie(this.state.movie);
  }

  render() {
    return (
      <form className="form" onSubmit={this.#handleSubmit}>
        <NewMovieField
          title="title"
          value={this.state.movie.title}
          handleOnChange={this.setValue}
          checkValidation={this.setValidation}
          isValid={this.state.fields.title.isValid}
        />
        <div className="form__item">
          <label htmlFor="fieldDescription">Description</label>
          <textarea
            placeholder="Description..."
            className="form__textarea"
            id="fieldDescription"
            value={this.state.movie.description}
            onChange={(event) => {
              this.setValue('description', event.target.value);
            }}
          />
        </div>
        <NewMovieField
          title="imgUrl"
          value={this.state.movie.imgUrl}
          handleOnChange={this.setValue}
          checkValidation={this.setValidation}
          isValid={this.state.fields.imgUrl.isValid}
        />
        <NewMovieField
          title="imdbUrl"
          value={this.state.movie.imdbUrl}
          handleOnChange={this.setValue}
          checkValidation={this.setValidation}
          isValid={this.state.fields.imdbUrl.isValid}
        />
        <NewMovieField
          title="imdbId"
          value={this.state.movie.imdbId}
          handleOnChange={this.setValue}
          checkValidation={this.setValidation}
          isValid={this.state.fields.imdbId.isValid}
        />
        <button
          className="form__button"
          type="submit"
          disabled={this.state.isButtonDisabled}
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
