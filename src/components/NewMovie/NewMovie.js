import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputFieldBlock } from '../InputFieldBlock';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imgUrlError: false,
    imdbUrl: '',
    imdbUrlError: false,
    imdbId: '',
  };

  isValid = (string, regexp) => {
    return regexp.test(string);
  }

  clear = () => {
    this.setState({});
  }

  onAdd = (event) => {
    event.preventDefault();
    // eslint-disable-next-line
    const regexp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    const imgUrl = event.target.elements.imgUrl.value;
    const imdbUrl = event.target.elements.imdbUrl.value;

    if (!this.isValid(imgUrl, regexp)) {
      this.setState({ imgUrlError: true });

      return;
    }

    if (!this.isValid(imdbUrl, regexp)) {
      this.setState({ imdbUrlError: true });

      return;
    }

    const movie = {
      title: event.target.elements.title.value,
      description: event.target.elements.description.value,
      imgUrl,
      imdbUrl,
      imdbId: event.target.elements.imdbId.value,
    };

    this.props.addMovie(movie);
  }

  onChangeHandler = (event, stateKey) => {
    this.setState({
      [stateKey]: event.target.value,
      imgUrlError: false,
      imdbUrlError: false,
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      imgUrlError,
      imdbUrlError,
    } = this.state;

    return (
      <form
        className="movie-form"
        onSubmit={this.onAdd}
      >
        <fieldset>
          <legend>
            New movie
          </legend>
          <InputFieldBlock
            title="Title"
            labelFor="movie-form__title-label"
            inputType="text"
            inputId="movie-form__title-label"
            inputClass="movie-form__input-field"
            inputName="title"
            required
            inputValue={title}
            inputOnChange={(event) => {
              this.onChangeHandler(event, 'title');
            }}
          />
          <br />

          <label
            htmlFor="movie-form__description-label"
            className="movie-form__description-label"
          >
            Description:&nbsp;
            <br />
            <textarea
              type="text"
              id="movie-form__description-label"
              name="description"
              className="movie-form__description-field"
              value={description}
              onChange={(event) => {
                this.onChangeHandler(event, 'description');
              }}
            />
          </label>
          <br />

          <InputFieldBlock
            title="Image url"
            labelFor="movie-form__imgurl-label"
            inputType="text"
            inputId="movie-form__imgurl-label"
            inputClass={`${imgUrlError && ' error'}
              movie-form__input-field`}
            required
            inputName="imgUrl"
            inputValue={imgUrl}
            inputOnChange={(event) => {
              this.onChangeHandler(event, 'imgUrl');
            }}
          />
          {imgUrlError
            && (
            <span
              className="error-message"
            >
              Please, enter a valid URL
            </span>
            )
          }
          <br />

          <InputFieldBlock
            title="Image db url"
            labelFor="movie-form__imgdburl-label"
            inputType="text"
            inputId="movie-form__imgdburl-label"
            inputClass={`${imdbUrlError && ' error'}
                movie-form__input-field`}
            required
            inputName="imdbUrl"
            inputValue={imdbUrl}
            inputOnChange={(event) => {
              this.onChangeHandler(event, 'imdbUrl');
            }}
          />
          {imdbUrlError
            && (
            <span
              className="error-message"
            >
              Please, enter a valid URL
            </span>
            )
          }
          <br />

          <InputFieldBlock
            title="Image db id"
            labelFor="movie-form__imgdbid-label"
            inputType="text"
            inputId="movie-form__imgdbid-label"
            inputClass="movie-form__input-field"
            required
            inputName="imdbId"
            inputValue={imdbId}
            inputOnChange={(event) => {
              this.onChangeHandler(event, 'imdbId');
            }}
          />
          <br />

          <button
            type="submit"
            disabled={imgUrlError || imdbUrlError}
          >
            Add
          </button>
        </fieldset>

      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
