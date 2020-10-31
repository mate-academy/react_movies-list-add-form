import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { InputField } from '../InputField';

// eslint-disable-next-line max-len
const urlRegEx = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends PureComponent {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleError: false,
    imgUrlError: false,
    imdbUrlError: false,
    imdbIdError: false,
  };

  onAdd = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      titleError,
      imdbIdError,
      imdbUrlError,
      imgUrlError,
    } = this.state;

    if (titleError || imdbIdError || imdbUrlError || imgUrlError) {
      return;
    }

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
      titleError: false,
      imgUrlError: false,
      imdbUrlError: false,
      imdbIdError: false,
    });
  };

  onChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      [`${name}Error`]: false,
    });
  };

  validateText = (event) => {
    const { name, value } = event.target;

    this.setState({
      [`${name}Error`]: !value,
    });
  };

  validateUrl = (event) => {
    const { name, value } = event.target;

    this.setState({
      [`${name}Error`]: !value.match(urlRegEx),
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      titleError,
      imgUrlError,
      imdbUrlError,
      imdbIdError,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={event => (
          this.onAdd(event)
        )}
      >
        <h2 className="title is-3">Add movie</h2>
        <InputField
          name="title"
          value={title}
          label="Movie title:"
          onChange={this.onChange}
          hasError={titleError}
          errorMessage="Please enter the title"
          onBlur={this.validateText}
        />

        <div className="field">
          <label
            htmlFor="description"
            className="label"
          >
            Movie description:
          </label>

          <textarea
            className="textarea"
            name="description"
            id="description"
            value={description}
            onChange={this.onChange}
          />
        </div>

        <InputField
          name="imgUrl"
          value={imgUrl}
          label="Image link:"
          onChange={this.onChange}
          hasError={imgUrlError}
          errorMessage="Please enter valid image link"
          onBlur={this.validateUrl}
        />

        <InputField
          name="imdbUrl"
          value={imdbUrl}
          label="Movie link:"
          onChange={this.onChange}
          hasError={imdbUrlError}
          errorMessage="Please enter valid movie link"
          onBlur={this.validateUrl}
        />

        <InputField
          name="imdbId"
          value={imdbId}
          label="Movie id:"
          onChange={this.onChange}
          hasError={imdbIdError}
          errorMessage="Please enter movie id"
          onBlur={this.validateText}
        />

        <button
          type="submit"
          className="button is-primary"
          disabled={titleError || imdbIdError || imdbUrlError || imgUrlError}
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
