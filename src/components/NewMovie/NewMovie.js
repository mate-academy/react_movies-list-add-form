import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errors: {
      title: [],
      description: [],
      imgUrl: [],
      imdbUrl: [],
      imdbId: [],
    },
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.handleValidation()) {
      this.props.onAdd(this.state.title);
      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    }
  }

  handleValidation() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const errors = {
      title: [],
      description: [],
      imgUrl: [],
      imdbUrl: [],
      imdbId: [],
    };
    let formIsValid = true;

    if (!title) {
      formIsValid = false;
      errors.title.push('Title is empty');
    }

    if (!description) {
      formIsValid = false;
      errors.description.push('Description is empty');
    }

    if (!imgUrl) {
      formIsValid = false;
      errors.imgUrl.push('Image URL is empty');
    }

    if (!imdbUrl) {
      formIsValid = false;
      errors.imdbUrl.push('IMDB URL is empty');
    }

    if (!imdbId) {
      formIsValid = false;
      errors.imdbId.push('IMDB ID is empty');
    }

    // eslint-disable-next-line
    if (!/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(imdbUrl)) {
      formIsValid = false;
      errors.imdbUrl.push('IMDB URL is not valid');
    }

    // eslint-disable-next-line
    if (!/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(imdbId)) {
      formIsValid = false;
      errors.imdbId.push('IMDB ID is not valid');
    }

    this.setState({
      errors,
    });

    return formIsValid;
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId, errors } = this.state;

    return (
      <form
        className={classNames(
          { redBorder: errors.title[0] },
        )}
        name="text"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={this.handleChange}
        />
        <div className="error">
          {errors.title[0]}
        </div>
        <input
          className={classNames(
            { redBorder: errors.title[0] },
          )}
          type="text"
          placeholder="description"
          name="description"
          value={description}
          onChange={this.handleChange}
        />
        <div className="error">
          {errors.description[0]}
        </div>
        <input
          className={classNames(
            { redBorder: errors.title[0] },
          )}
          type="text"
          placeholder="imgUrl"
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
        />
        <div className="error">
          {errors.imgUrl[0]}
        </div>
        <input
          className={classNames(
            { redBorder: errors.title[0] },
          )}
          type="text"
          placeholder="imdbUrl"
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
        />
        <div className="error">
          {errors.imdbUrl[0]}
        </div>
        <input
          className={classNames(
            { redBorder: errors.title[0] },
          )}
          type="text"
          placeholder="imdbId"
          name="imdbId"
          value={imdbId}
          onChange={this.handleChange}
        />
        <div className="error">
          {errors.imdbId[0]}
        </div>
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
